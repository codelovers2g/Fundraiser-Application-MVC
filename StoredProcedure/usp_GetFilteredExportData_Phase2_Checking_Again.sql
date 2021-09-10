/*
-- [dbo].[udf_GetFinancialColumnQuery] 1
-- usp_GetFilteredExportData_Phase2 @OrganizationId=1,@UserId=1,@ColumnNames='Pledge1,Pledge2,Payment1',@SearchKeywords='jim',@Genders='2'
-- usp_GetFilteredExportData_Phase2 @OrganizationId=3061,@UserId=5064,@ColumnIds='',@GroupTypeCriteriaColumnIds='38',@SearchKeywords=''
-- usp_GetFilteredExportData_Phase2_Checking_Again @OrganizationId=1,@UserId=1,@ColumnIds='65',@Genders='',
	@GroupTypeCriteriaColumnIds='',@PersonCriteriaForFinancialColumns='2',@PersonCriteriaForGroupColumns=''
*/
CREATE PROC [dbo].[usp_GetFilteredExportData_Phase2_Checking_Again]
@OrganizationId INT,
@UserId INT,
@ColumnIds nvarchar(500) = '',
@GroupTypeCriteriaColumnIds varchar(500) = '',

@Genders			NVARCHAR(10)='',
@MaritalStatuses	NVARCHAR(10)='',
@MarriedEmpty		BIT = 0,
@LivingStatus		NVARCHAR(10)='',
@TitleH				NVARCHAR(MAX)='',
@TitleHEmpty		BIT = 0,
@SuffixH			NVARCHAR(MAX)='',
@SuffixHEmpty		BIT = 0,
@TribesH			NVARCHAR(MAX)='',
@TribesHEmpty		BIT = 0,
@Titles				NVARCHAR(MAX)='',
@TitlesEmpty		BIT = 0,
@Tribes				NVARCHAR(MAX)='',
@TribesEmpty		BIT = 0,
@Neighbourhoods		NVARCHAR(MAX)='',
@Cities				NVARCHAR(MAX)='',
@States				NVARCHAR(MAX)='',
@Zip				NVARCHAR(MAX)='',
@Countries			NVARCHAR(MAX)='',
@AnniversaryFromDate DATETIME = NULL,
@AnniversaryToDate	DATETIME = NULL,

@SortColumn			NVARCHAR(50) = '',
@SortDir			NVARCHAR(50) = 'ASC',
@Start				INT = 0,
@PageSize			INT = 10,
@SearchKeywords		NVARCHAR(200) = '',
@PersonCriteriaForGroupColumns   NVARCHAR(MAX)='',
@PersonCriteriaForFinancialColumns NVARCHAR(MAX)=''
AS
BEGIN
--DECLARE @temp table(Total nvarchar(MAX))
DECLARE @UdfQuery NVARCHAR(MAX) = ''
DECLARE @SelectUdfQuery NVARCHAR(MAX) = ''
DECLARE @UdfQueryWithSelectAndPerson NVARCHAR(MAX) = ''
DECLARE @SelectColumnQueryForGroupTypeWithPerson NVARCHAR(MAX) = ''
DECLARE @PersonWhereUdfQuery NVARCHAR(MAX) = ''
DECLARE @PersonWhereUdfQuery1 NVARCHAR(MAX) = ''
Declare @SelectColumnQueryForGroupType NVARCHAR(MAX) = ''
Declare @JoinQueryForGroupType NVARCHAR(MAX) = ''
DECLARE @PagingQuery NVARCHAR(500) = ''
DECLARE @OrderBy NVARCHAR(500) = ''
DECLARE @MaritalQuery	NVARCHAR(MAX) = ''
DECLARE @MainQuery NVARCHAR(MAX) = ''
DECLARE @AddressQuery NVARCHAR(MAX) = ''
DECLARE @WhereQuery NVARCHAR(MAX) = ''
DECLARE @KeywordTemplate  NVARCHAR(MAX) = ''
DECLARE @TotalQuery INT= 0
DECLARE @SelectQuery NVARCHAR(MAX) = ''
DECLARE @QueryRequired NVARCHAR(MAX)=''
DECLARE @PeopleIdFiltered NVARCHAR(MAX)=''
DECLARE @ActualPeopleId NVARCHAR(MAX)=''
DECLARE @SelectQueryforWhereQuery NVARCHAR(MAX)=''

IF (@Neighbourhoods <> '')	SET @AddressQuery += ' AND ISNULL(Neighborhood,"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Neighbourhoods + '", ","))'
IF (@Cities <> '')			SET @AddressQuery += ' AND ISNULL(City,"empty")IN (SELECT * FROM STRING_SPLIT ("' + @Cities + '", ","))' 
IF (@States <> '')			SET @AddressQuery += ' AND ISNULL(CAST(StateId AS nvarchar(10)),"empty") IN (SELECT * FROM STRING_SPLIT ("' + @States + '", ","))'
IF (@Zip <> '')				SET @AddressQuery += ' AND ISNULL(Zip,"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Zip + '", ","))'
IF (@Countries <> '')		SET @AddressQuery += ' AND ISNULL(CAST(CountryId AS nvarchar(10)),"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Countries + '", ","))'

SET @AddressQuery = '
LEFT JOIN (
	SELECT  t.*
	FROM    (
		SELECT  DISTINCT PeopleId
		FROM    Addresses
	) mo
	CROSS APPLY
	(
		SELECT  TOP 1 *--, CASE WHEN FamilyOf IS NOT NULL AND AddressTypeId=1 THEN 1 WHEN AddressTypeId=1 THEN 2 ELSE 3 END AddressPriority
		FROM    Addresses mi
		WHERE   mi.PeopleId = mo.PeopleId
			AND IsDeleted = 0 ' + @AddressQuery + '
			AND mi.AddressTypeId=1
		--ORDER BY AddressPriority asc, AddressId desc			
	) t
) AS Address ON ISNULL(People.FamilyOf,People.PeopleId) = Address.PeopleId
'

SET @MainQuery = '
 FROM 
	People
	LEFT JOIN People as F on People.FatherId=F.PeopleId
	LEFT JOIN People as M on People.MotherId=M.PeopleId
	LEFT JOIN TitleSuffix orgTitle ON People.TitleId = orgTitle.TitleSuffixId
	LEFT JOIN TitleSuffix orgTitleH ON People.TitleIdH = orgTitleH.TitleSuffixId 
	LEFT JOIN TitleSuffix orgSuffixH ON People.SufIdH = orgSuffixH.TitleSuffixId ' 
	+ @AddressQuery + 
	'
	LEFT JOIN State ON Address.StateId = STATE.State_seq
	LEFT JOIN Country ON Address.countryid = Country.Country_seq
	LEFT JOIN (
		SELECT PeopleId , MIN(PhoneId) PhoneId FROM Phones
		WHERE IsDeleted = 0 AND PhoneTypeId = 2
		Group by PeopleId
	) CellId ON People.PeopleId = CellId.PeopleId
	LEFT JOIN (
		SELECT PhoneId , PhoneNo, AreaCode  FROM Phones
	) Cell ON CellId.PhoneId = Cell.PhoneId
	LEFT JOIN (
		SELECT PeopleId , MIN(PhoneId) PhoneId FROM Phones
		WHERE IsDeleted = 0 AND PhoneTypeId = 3
		Group by PeopleId
	) EmailId ON People.PeopleId = EmailId.PeopleId
	LEFT JOIN (
		SELECT PhoneId , PhoneNo  FROM Phones
	) Email ON EmailId.PhoneId = Email.PhoneId
	LEFT JOIN (
		SELECT TOP 1 Addresses.PeopleId, MIN(PhoneId) AS PhoneId FROM Addresses
		LEFT JOIN Phones ON Addresses.AddressId = Phones.AddressId
		Where Addresses.AddressTypeId = 1 AND Addresses.IsDeleted = 0 AND Phones.PhoneTypeId = 1 AND Phones.IsDeleted = 0
		Group by addresses.PeopleId
	) HPhoneId On People.PeopleId = HPhoneId.PeopleId OR Address.PeopleId = HPhoneId.PeopleId
	LEFT JOIN (
		SELECT PhoneId , PhoneNo, AreaCode, Extension FROM Phones
	) HPhone ON HPhoneId.PhoneId = HPhone.PhoneId
<JoinForAdditionalFinancialColumns>
<JoinForAdditionalGroupTypeColumns>
'

IF @ColumnIds <> '' AND @PersonCriteriaForFinancialColumns<>''
BEGIN
	SET @ColumnIds = @ColumnIds + ','
	PRINT(CAST(@ColumnIds +'----'+@PersonCriteriaForFinancialColumns  AS TEXT))
	SET @UdfQueryWithSelectAndPerson = [dbo].[udf_GetColumnsAsSelectColumns](@ColumnIds,@PersonCriteriaForFinancialColumns,0)
	
	SET @UdfQuery = [dbo].[udf_GetFinancialColumnQuery](@ColumnIds)
END

DECLARE @pos INT
DECLARE @len INT
DECLARE @Ctr INT

SET @Ctr = 0
SET @pos = 0
SET @len = 0

WHILE CHARINDEX('|', @UdfQueryWithSelectAndPerson, @pos+1)>0
BEGIN
	SET @len = CHARINDEX('|', @UdfQueryWithSelectAndPerson, @pos+1) - @pos
	IF @Ctr = 0 SET @SelectUdfQuery = SUBSTRING(@UdfQueryWithSelectAndPerson, @pos, @len)
	ELSE IF @Ctr = 1 SET @PersonWhereUdfQuery1 = SUBSTRING(@UdfQueryWithSelectAndPerson, @pos, @len)
	SET @Ctr += 1 
	SET @pos = CHARINDEX('|', @UdfQueryWithSelectAndPerson, @pos+@len) +1
END

IF @GroupTypeCriteriaColumnIds <> '' AND @PersonCriteriaForGroupColumns<>''
BEGIN
PRINT(CAST(CAST(@GroupTypeCriteriaColumnIds AS NVARCHAR)+'-------' +@PersonCriteriaForGroupColumns  AS TEXT))
	SET @SelectColumnQueryForGroupTypeWithPerson = [dbo].[udf_GetColumnsAsGroupSelectColumns_Checking] (CAST(@GroupTypeCriteriaColumnIds AS NVARCHAR),CAST(@PersonCriteriaForGroupColumns AS nvarchar),0)
	SET @JoinQueryForGroupType = [dbo].[udf_GetJoinQueryForGroupSelectColumns_Checking] (@GroupTypeCriteriaColumnIds)	
END

SET @Ctr = 0
SET @pos = 0
SET @len = 0

WHILE CHARINDEX('|', @SelectColumnQueryForGroupTypeWithPerson, @pos+1)>0
BEGIN
	SET @len = CHARINDEX('|', @SelectColumnQueryForGroupTypeWithPerson, @pos+1) - @pos
	IF @Ctr = 0 SET @SelectColumnQueryForGroupType = SUBSTRING(@SelectColumnQueryForGroupTypeWithPerson, @pos, @len)
	ELSE IF @Ctr = 1 SET @PersonWhereUdfQuery = @PersonWhereUdfQuery + SUBSTRING(@SelectColumnQueryForGroupTypeWithPerson, @pos, @len)
	SET @Ctr += 1 
	SET @pos = CHARINDEX('|', @SelectColumnQueryForGroupTypeWithPerson, @pos+@len) +1
END

SET @SelectQuery='SET QUOTED_IDENTIFIER OFF
SELECT
	People.PeopleId,
	People.FirstName,
	People.LastName,
	CONCAT(orgTitle.Name," ",People.FirstName," ",People.LastName) AS Name,
	People.GenderId,
	People.Deceased,
	People.DeceasedDate,
	People.Anniversary,
	People.AliyaName AS Aliya,
	People.CallName,
	People.AliyaNameH AS HAliya,
	People.CallNameH AS HCallName,
	People.FirstNameH,
	People.LastNameH,	
	CONCAT(F.FirstName," ", F.LastName) FatherName,
	CONCAT(M.FirstName," ", M.LastName) MotherName,
	People.Married AS MarriedStatus,
	People.TitleId, 
	orgTitle.Name AS Title,
	People.TitleIdH, orgTitleH.Name TitleH, People.SufIdH, orgsuffixH.Name AS HSuffix, People.TribeIdH, People.TribeId,
	CONCAT(Address.HouseNo," ",Address.Street," ",IIF(ISNULL(Address.Apartment,"")<>"", CONCAT("#",Address.Apartment), "")) AS Address,
	Address.HouseNo AS House,
	Address.Street AS Street,
	Address.Apartment AS Apartment,
	Address.OptionalLine1 AS Line1,
	Address.OptionalLine2 AS Line2, 
	Address.Neighborhood,
	Address.City,
	State.Name AS State,
	Address.Zip,
	Country.Name AS Country,
	HPhone.PhoneNo AS HPhone,
	CONCAT(Cell.PhoneNo, " ",Cell.AreaCode) AS Cell,
	Email.PhoneNo AS Email,
	--COUNT(*) OVER() AS Total
	<TotalQuery> AS Total
	<SelectColumns>
	<SelectGroupTypeColumns>'

SET @SelectQuery = REPLACE(@SelectQuery,'<SelectColumns>',@SelectUdfQuery)
SET @MainQuery = REPLACE(@MainQuery,'<JoinForAdditionalFinancialColumns>',@UdfQuery)
SET @SelectQuery = REPLACE(@SelectQuery,'<SelectGroupTypeColumns>',@SelectColumnQueryForGroupType)
SET @MainQuery = REPLACE(@MainQuery,'<JoinForAdditionalGroupTypeColumns>',@JoinQueryForGroupType)


SET @WhereQuery += ' 
WHERE People.IsDeleted = 0 AND People.OrganizationId = ' + CAST(@OrganizationId AS NVARCHAR) + ' 
' 

IF (@Genders <> '')	SET @WhereQuery += ' AND People.GenderId IN (' + @Genders + ')'

IF (@MaritalStatuses <> '')	SET @MaritalQuery += ' People.Married IN (' + @MaritalStatuses + ')'

IF (@MarriedEmpty = 1) -- married empty field was selected
BEGIN
	IF (@MaritalStatuses <> '') SET @WhereQuery +=  ' AND ( People.Married IN (' + @MaritalStatuses + ') OR People.Married IS NULL )'
	ELSE SET @WhereQuery +=  ' AND People.Married IS NULL'
END
ELSE IF (@MarriedEmpty = 0) -- married empty field was not selected
	IF (@MaritalStatuses <> '') SET @WhereQuery +=  ' AND People.Married IN (' + @MaritalStatuses + ')'


IF (@LivingStatus <> '') SET @WhereQuery += ' AND People.Deceased IN (' + @LivingStatus + ')'


IF (@TitleHEmpty = 1) -- titleh empty field was selected
BEGIN
	IF (@TitleH <> '') SET @WhereQuery +=  ' AND ( People.TitleIdH IN (' + @TitleH + ') OR People.TitleIdH IS NULL )'
	ELSE SET @WhereQuery +=  ' AND People.TitleIdH IS NULL'
END
ELSE IF (@TitleHEmpty = 0) -- titleh empty field was not selected
	IF (@TitleH <> '') SET @WhereQuery +=  ' AND People.TitleIdH IN (' + @TitleH + ')'



IF (@SuffixHEmpty = 1) -- SuffixH empty field was selected
BEGIN
	IF (@SuffixH <> '') SET @WhereQuery +=  ' AND ( People.SufIdH IN (' + @SuffixH + ') OR People.SufIdH IS NULL )'
	ELSE SET @WhereQuery +=  ' AND People.SufIdH IS NULL'
END
ELSE IF (@SuffixHEmpty = 0) -- SuffixH empty field was not selected
	IF (@SuffixH <> '') SET @WhereQuery +=  ' AND People.SufIdH IN (' + @SuffixH + ')'
--IF (@SuffixH <> '')	SET @WhereQuery += ' AND People.SufIdH IN (' + @SuffixH + ')'

IF (@TribesHEmpty = 1) -- TribesH empty field was selected
BEGIN
	IF (@TribesH <> '') SET @WhereQuery +=  ' AND ( People.TribeIdH IN (' + @TribesH + ') OR People.TribeIdH IS NULL )'
	ELSE SET @WhereQuery +=  ' AND People.TribeIdH IS NULL'
END
ELSE IF (@TribesHEmpty = 0) -- TribesH empty field was not selected
	IF (@TribesH <> '') SET @WhereQuery +=  ' AND People.TribeIdH IN (' + @TribesH + ')'
--IF (@TribesH <> '') SET @WhereQuery += ' AND People.TribeIdH IN (' + @TribesH + ')'


IF (@TitlesEmpty = 1) -- Titles empty field was selected
BEGIN
	IF (@Titles <> '') SET @WhereQuery +=  ' AND ( People.TitleId IN (' + @Titles + ') OR People.TitleId IS NULL )'
	ELSE SET @WhereQuery +=  ' AND People.TitleId IS NULL'
END
ELSE IF (@TitlesEmpty = 0) -- Titles empty field was not selected
	IF (@Titles <> '') SET @WhereQuery +=  ' AND People.TitleId IN (' + @Titles + ')'
--IF (@Titles <> '') SET @WhereQuery += ' AND People.TitleId IN (' + @Titles + ')'

IF (@TribesEmpty = 1) -- Tribe empty field was selected
BEGIN
	IF (@Tribes <> '') SET @WhereQuery +=  ' AND ( People.TribeId IN (' + @Tribes + ') OR People.TribeId IS NULL )'
	ELSE SET @WhereQuery +=  ' AND People.TribeId IS NULL'
END
ELSE IF (@TribesEmpty = 0) -- Tribe empty field was not selected
	IF (@Tribes <> '') SET @WhereQuery +=  ' AND People.TribeId IN (' + @Tribes + ')'
--IF (@Tribes <> '') SET @WhereQuery += ' AND People.TribeId IN (' + @Tribes + ')'

IF (@Neighbourhoods <> '')	SET @WhereQuery += ' AND ISNULL(Neighborhood,"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Neighbourhoods + '", ","))'
IF (@Cities <> '')			SET @WhereQuery += ' AND ISNULL(City,"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Cities + '", ","))' 
IF (@States <> '')			SET @WhereQuery += ' AND ISNULL(CAST(StateId AS nvarchar(10)),"empty") IN (SELECT * FROM STRING_SPLIT ("' + @States + '", ","))'
IF (@Zip <> '')				SET @WhereQuery += ' AND ISNULL(Zip,"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Zip + '", ","))'
IF (@Countries <> '')		SET @WhereQuery += ' AND ISNULL(CAST(CountryId AS nvarchar(10)),"empty") IN (SELECT * FROM STRING_SPLIT ("' + @Countries + '", ","))'

IF (@AnniversaryFromDate IS NOT NULL)
	SET @WhereQuery = @WhereQuery + '	AND CAST(People.Anniversary AS date) >= "' +  CONVERT(NVARCHAR,CAST(@AnniversaryFromDate AS date),23) + '"'

IF (@AnniversaryToDate IS NOT NULL)
	SET @WhereQuery = @WhereQuery + ' AND CAST(People.Anniversary AS date) <= "' +  CONVERT(NVARCHAR,CAST(@AnniversaryToDate AS date),23) + '"'


IF @SearchKeywords <> ''
BEGIN
	SET @KeywordTemplate = 'AND (
	People.PeopleId			LIKE "%<keyword>%"  
    OR People.FirstName		LIKE "%<keyword>%"
	OR People.LastName		LIKE "%<keyword>%"
	OR People.Deceased		LIKE "%<keyword>%"
	OR People.DeceasedDate	LIKE "%<keyword>%"
	OR People.Anniversary	LIKE "%<keyword>%"
	OR People.AliyaName		LIKE "%<keyword>%"
	OR People.CallName		LIKE "%<keyword>%"
	OR People.AliyaNameH	LIKE "%<keyword>%"
	OR People.CallNameH		LIKE "%<keyword>%"
	OR People.FirstNameH	LIKE "%<keyword>%"
	OR People.LastNameH		LIKE "%<keyword>%"
	OR F.FirstName			LIKE "%<keyword>%"
	OR F.LastName			LIKE "%<keyword>%"
	OR M.FirstName          LIKE "%<keyword>%"
	OR M.LastName			LIKE "%<keyword>%"
	OR orgTitle.Name		LIKE "%<keyword>%"
	OR orgTitleH.Name		LIKE "%<keyword>%"
	OR Address.Address1		LIKE "%<keyword>%"
	OR Address.Neighborhood	LIKE "%<keyword>%"
	OR Address.City			LIKE "%<keyword>%"
	OR State.Name			LIKE "%<keyword>%"
	OR Address.Zip			LIKE "%<keyword>%"
	OR Country.Name			LIKE "%<keyword>%"
	OR HPhone.PhoneNo		LIKE "%<keyword>%"
	OR Cell.PhoneNo			LIKE "%<keyword>%"
	OR Cell.AreaCode		LIKE "%<keyword>%"
	OR Email.PhoneNo		LIKE "%<keyword>%"
	)'
	SET @KeywordTemplate  = REPLACE (@KeywordTemplate, '<keyword>', @SearchKeywords)
	SET @WhereQuery += @KeywordTemplate;
END

IF @PersonWhereUdfQuery <> ''
	SET @WhereQuery += @PersonWhereUdfQuery

IF (ISNULL(@SortColumn, '') = '') SET @SortColumn = 'People.PeopleId'

SET @OrderBy = '
ORDER BY ' + @SortColumn + ' ' + ISNULL(@SortDir, '')

IF(@PageSize<>0)
BEGIN
	SET @PagingQuery = ' OFFSET ' + CAST(@Start AS NVARCHAR) + ' ROWS FETCH NEXT ' + CAST(@PageSize AS NVARCHAR) + ' ROWS ONLY'
END

SET @PeopleIdFiltered='SELECT DISTINCT People.PeopleId From People <JoinForAdditionalGroupTypeColumns1>'+ @WhereQuery
SET @PeopleIdFiltered = REPLACE(@PeopleIdFiltered,'<JoinForAdditionalGroupTypeColumns1>',@JoinQueryForGroupType)

SET @QueryRequired='SET QUOTED_IDENTIFIER OFF SELECT COUNT(*) AS Total '+ @MainQuery + @WhereQuery+ @PersonWhereUdfQuery1
	
	DECLARE @Results TABLE (ResultText NVARCHAR(MAX));

	INSERT INTO @Results		
	EXECUTE SP_EXECUTESQL @QueryRequired 
	
SELECT @TotalQuery=ResultText from @Results

SET @SelectQuery = REPLACE(@SelectQuery,'<TotalQuery>',@TotalQuery)

create table #ResultedPeopleId (PeopleId NVARCHAR(MAX))
	INSERT INTO #ResultedPeopleId EXECUTE SP_EXECUTESQL @PeopleIdFiltered

SET @SelectQuery = @SelectQuery+@MainQuery+'JOIN #ResultedPeopleId ON #ResultedPeopleId.PeopleId=People.PeopleId'+ @PersonWhereUdfQuery1 + @OrderBy + @PagingQuery
--SET @SelectQuery = @SelectQuery+@MainQuery+'JOIN (' + @PeopleIdFiltered + ')A ON A.PeopleId=People.PeopleId' + @OrderBy + @PagingQuery
--SET @SelectQuery = @SelectQuery+@MainQuery+'JOIN #ResultedPeopleId A ON A.PeopleId=People.PeopleId' + @OrderBy + @PagingQuery

PRINT(CAST(@PeopleIdFiltered as TEXT))
PRINT(CAST(@SelectQuery as TEXT))

EXECUTE SP_EXECUTESQL @SelectQuery

drop table #ResultedPeopleId 



END