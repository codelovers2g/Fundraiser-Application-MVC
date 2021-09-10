var templateName = "";
var templateList = "";
var TemplateFilesPath = "";
var arrayFileName = [];
var ExistingBgImg = "";
var ExistingBgImgOriginalName = null;
var selectedBgImage;
var selectedAttachments;
var flagForAssociatePerson = false;
var objPeopleFilterVmForStatement = {};
var AllPeopleList = [];

var ledgerHtml = "";
var ledgerHtml1 = "";
var selectedUserAddress = "";
var selectedUserPhone = "";
var selectedPersonEmail = "";
var selectedUserFirstName = "";
var selectedUserLastName = "";
var selectedPersonName = "";
var selectedPersonFirstName = "";
var selectedPersonFirstNameH = "";
var selectedPersonLastName = "";
var selectedPersonLastNameH = "";
var selectedPersonTitle = "";
var selectedPersonTitleH = "";
var selectedPersonSuffixH = "";
var selectedPersonCallName = "";
var selectedPersonHebrewName = "";
var selectedPersonAddress = "";
var selectedPersonFormattedAddress = "";
var selectedPersonBalance = "";
var selectedPersonAliya = "";
var selectedPersonTribe = "";
var selectedPersonTribeH = "";
var selectedPersonAliyaH = "";
var selectedPersonCallNameH = "";
var selectedPersonAnniversary = "";
var selectedPersonHomePhone = "";
var selectedPersonBusinessPhone = "";
var selectedPersonEmail = "";
var selectedPersonNameHebrew = "";
var callName = "";
var callNameH = "";
var personFirstName = ''
var personFirstNameHebrew = ''
var personLastName = ''
var personLastNameHebrew = ''
var personTitle = "";
//var selectedPersonTitleH = "";
var personSuffixH = "";
var aliya = "";
var aliyaH = "";
var tribe = "";
var tribeH = "";
var anniversary = "";
var fatherName = "";
var motherName = "";
var amount = ''
var paymentDate = "";
var address = '';
var selectedPersonFormattedAddress = "";
var manualReceipt = "";
var receiptMessage = "";
var paymentMethod = "";
var attachmentDeleted = [];
var attachmentSelected = [];
var templateAttachmentPath = "";
var ExistingBgImgOriginalName = "";
var defaultTemplateAttachments = [];
var objPeopleFilterVmForStatement = {};
var peopleCountEmailSetup;
var peopleCountNoEmailSetup;
var allStatementHtml = "";
var defaultStatementFormats = {};
var solicitor1 = "";
var solicitor2 = "";
var solicitor3 = "";
var solicitor4 = "";
var honoree1 = "";
var honoree2 = "";
var event1 = '';
var event2 = '';
var personSuffixHebrew = "";
var defaultReceiptFormats = {};
var personTitleHebrew = "";
var SSN = "";
var DOB;
var Anniversary;
var FamilyOf = "";
var Deceased = "";
var DeceasedDate;
var Gender = "";
var Married = "";
var Phone = "";
var selectedPersonHomePhone = "";
var selectedPersonBusinessPhone = "";
// loader object to show and hide loader on page

//Organization variables
var organizationName = "";
var organizationHebrewName = "";
var organizationLogo = "";
var organizationAddress = "";

//User variables
var UserFirstName = "";
var UserLastName = "";
var UserPhone = "";
var UserEmail = "";
var UserAddress = "";
// category
var selectedCategoryDescription = "";
var selectedCategory = "";

// father variable
var selectedPersonFatherName = "";
var selectedPersonFatherNameH = "";
var selectedPersonFatherFirstName = "";
var selectedPersonFatherLastName = "";
var selectedPersonFatherFirstNameH = "";
var selectedPersonFatherLastNameH = "";
var selectedPersonFatherTitle = "";
var selectedPersonFatherTitleH = "";
var selectedPersonFatherSuffix = "";
var selectedPersonFatherMiddleName = "";
var selectedPersonFatherCallName = "";
var selectedPersonFatherCallNameH = "";


// mother
var selectedPersonMotherName = "";
var selectedPersonMotherNameH = "";
var selectedPersonMotherFirstName = "";
var selectedPersonMotherLastName = "";
var selectedPersonMotherFirstNameH = "";
var selectedPersonMotherLastNameH = "";
var selectedPersonMotherTitle = "";
var selectedPersonMotherTitleH = "";
var selectedPersonMotherSuffix = "";
var selectedPersonMotherMiddleName = "";
var selectedPersonMotherCallName = "";
var selectedPersonMotherCallNameH = "";
var PrevAdditionalText1 = '';
var PrevAdditionalText2 = '';
var isAdditionalText1AlreadyReplaced = false;
var isAdditionalText2AlreadyReplaced = false;
var btnTemplateSaveClicked = false;

var stmtheader = ''; var stmtbody = ''; var stmtfooter = ''; var mailbody = ''; var mailsub = '';

var loader = {

    showloader: function () {
        $(".loading").show();
    },
    hideloader: function () {
        $(".loading").hide();
    }
}
var PrintReport = {
    GetAllDefaultReceiptFormats: function () {
        ajaxrepository.callService('/Account/GetAllDefaultStatementFormats', '', PrintReport.GetAllDefaultStatementFormatsOnSuccess, commonTemplate.OnError, undefined);
    },
    GetAllDefaultStatementFormatsOnSuccess: function (d, s, e) {
        if (s == 'success') {
            if (d != -1) {
                defaultStatementFormats = d;
                //var paymentId = $("#hiddenPaymentId").val();
                //Receipt.GetPaymentReceiptDetailsById(paymentId);

                // to check if send multiple or single statement
                if (objPeopleFilterVmForStatement != null) {
                    if (objPeopleFilterVmForStatement.isForMultiplePerson == true) {
                        //if (objPeopleFilterVmForStatement.hasNoEmailSetup == true) {
                        $("#btnPrintStatementAll").removeClass('d-none')
                        //} else if (objPeopleFilterVmForStatement.hasNoEmailSetup == false) {
                        $("#btnEmailStatementAll").removeClass('d-none')
                        // }
                        $("#personCounterEmail").removeClass('d-none')
                        $("#personCounterPrint").removeClass('d-none')
                        $("#hdnCategoryId").val(objPeopleFilterVmForStatement.CategoryId)
                        $("#pageHeading").html("Statement Report Preview")
                        $("#personCounterEmail").html(peopleCountEmailSetup);
                        $("#personCounterPrint").html(peopleCountNoEmailSetup);
                        PrintReport.getPersonDetailForStatementPreview();
                    }
                } else {
                    PrintReport.GetLedgerForStatementReport();
                    $("#btnPrintStatement").removeClass('d-none')
                    $("#btnEmailStatement").removeClass('d-none')
                }



                //PrintReport.GetLedgerForStatementReport();
                //$("#btnPrintStatement").removeClass('d-none')
                //$("#btnEmailStatement").removeClass('d-none')
            } else {
                commonTemplate.onError();
            }
        } else {
            commonTemplate.onError();
        }
    },
    ReplaceMergeFieldsWithHtml: function (dataStr) {
        var format1 = defaultStatementFormats.find(element => element.FormatName === "[StatementFormat1]");
        var format2 = defaultStatementFormats.find(element => element.FormatName === "[StatementFormat2]");
        return dataStr.replace(/\[StatementFormat1\]/g, format1.FormatContent)
            .replace(/\[StatementFormat2\]/g, format2.FormatContent);
    },
    ReplaceMergeFields: function (dataStr) {
        return dataStr.replace(/\[Name\]/g, selectedPersonName)
            .replace(/\[StatementFormat1\]/g, ledgerHtml)
            .replace(/\[StatementFormat2\]/g, ledgerHtml1)
            .replace(/\[Balance\]/g, selectedPersonBalance)
            .replace(/\[Address\]/g, selectedPersonAddress)
            .replace(/\[FormattedAddress\]/g, selectedPersonFormattedAddress)
            //.replace(/\[UAddress\]/g, selectedUserAddress)
            .replace(/\[Phone\]/g, selectedUserPhone)
            .replace(/\[Email\]/g, selectedPersonEmail)
            //.replace(/\[UserFirstName\]/g, selectedUserFirstName)
            //.replace(/\[UserLastName\]/g, selectedUserLastName)
            .replace(/\[HebrewName\]/g, selectedPersonHebrewName)
            .replace(/\[CallName\]/g, selectedPersonCallName)
            .replace(/\[PersonFirstName\]/g, selectedPersonFirstName)
            .replace(/\[PersonFirstNameH\]/g, selectedPersonFirstNameH)
            .replace(/\[PersonLastName\]/g, selectedPersonLastName)
            .replace(/\[PersonLastNameH\]/g, selectedPersonLastNameH)
            .replace(/\[PersonSuffixH\]/g, selectedPersonSuffixH)
            .replace(/\[PersonTitle\]/g, selectedPersonTitle)
            .replace(/\[PersonTitleH\]/g, selectedPersonTitleH)
            .replace(/\[Aliya\]/g, selectedPersonAliya)
            .replace(/\[Tribe\]/g, selectedPersonTribe)
            .replace(/\[TribeH\]/g, selectedPersonTribeH)
            .replace(/\[AliyaH\]/g, selectedPersonAliyaH)
            .replace(/\[CallNameH\]/g, selectedPersonCallNameH)
            .replace(/\[Anniversary\]/g, common.ToJSDate(selectedPersonAnniversary))
            .replace(/\[FatherName\]/g, selectedPersonFatherName)
            .replace(/\[FatherNameH\]/g, selectedPersonFatherNameH)
            .replace(/\[MotherName\]/g, selectedPersonMotherName)
            .replace(/\[MotherNameH\]/g, selectedPersonMotherNameH)
            .replace(/\[DeceasedDate\]/g, DeceasedDate)
            .replace(/\[Gender\]/g, Gender)
            .replace(/\[Married\]/g, Married)
            .replace(/\[FamilyOf\]/g, FamilyOf)
            .replace(/\[DOB\]/g, DOB)
            .replace(/\[SSN\]/g, SSN)
            .replace(/\[BusinessPhone\]/g, selectedPersonBusinessPhone)
            .replace(/\[HomePhone\]/g, selectedPersonHomePhone)
            .replace(/\[Email\]/g, selectedPersonEmail)
            //category
            .replace(/\[Category\]/g, selectedCategory)
            .replace(/\[CategoryDescription\]/g, selectedCategoryDescription)
            //user
            .replace(/\[UserFirstName\]/g, UserFirstName)
            .replace(/\[UserLastName\]/g, UserLastName)
            .replace(/\[UserAddress\]/g, UserAddress)
            .replace(/\[UserPhone\]/g, UserPhone)
            .replace(/\[UserEmail\]/g, UserEmail)
            //organization
            .replace(/\[OrganizationName\]/g, organizationName)
            .replace(/\[OrganizationHebrewName\]/g, organizationHebrewName)
            .replace(/\[OrganizationAddress\]/g, organizationAddress)
            .replace(/\[OrganizationLogo\]/g, organizationLogo)
            //father
            .replace(/\[FatherFirstName\]/g, selectedPersonFatherFirstName)
            .replace(/\[FatherLastName\]/g, selectedPersonFatherLastName)
            .replace(/\[FatherFirstNameH\]/g, selectedPersonFatherFirstNameH)
            .replace(/\[FatherLastNameH\]/g, selectedPersonFatherLastNameH)
            .replace(/\[FatherTitle\]/g, selectedPersonFatherTitle)
            .replace(/\[FatherTitleH\]/g, selectedPersonFatherTitleH)
            .replace(/\[FatherSuffix\]/g, selectedPersonFatherSuffix)
            .replace(/\[FatherMiddleName\]/g, selectedPersonFatherMiddleName)
            .replace(/\[FatherCallName\]/g, selectedPersonFatherCallName)
            .replace(/\[FatherCallNameH\]/g, selectedPersonFatherCallNameH)
            //mother
            .replace(/\[MotherFirstName\]/g, selectedPersonMotherFirstName)
            .replace(/\[MotherLastName\]/g, selectedPersonMotherLastName)
            .replace(/\[MotherFirstNameH\]/g, selectedPersonMotherFirstNameH)
            .replace(/\[MotherLastNameH\]/g, selectedPersonMotherLastNameH)
            .replace(/\[MotherTitle\]/g, selectedPersonMotherTitle)
            .replace(/\[MotherTitleH\]/g, selectedPersonMotherTitleH)
            .replace(/\[MotherSuffix\]/g, selectedPersonMotherSuffix)
            .replace(/\[MotherMiddleName\]/g, selectedPersonMotherMiddleName)
            .replace(/\[MotherCallName\]/g, selectedPersonMotherCallName)
            .replace(/\[MotherCallNameH\]/g, selectedPersonMotherCallNameH)
            .replace(/\[AssociatedName\]/g, "")
            .replace(/\[AssociatedAddress\]/g, "")
            .replace(/\[AssociatedCallName\]/g, "")
            .replace(/\[AssociatedPersonFirstName\]/g, "")
            .replace(/\[AssociatedPersonFirstNameH\]/g, "")
            .replace(/\[AssociatedPersonLastName\]/g, "")
            .replace(/\[AssociatedPersonLastNameH\]/g, "")
            .replace(/\[AssociatedPersonSuffixH\]/g, "")
            .replace(/\[AssociatedHebrewName\]/g, "")
            .replace(/\[AssociatedPersonTitle\]/g, "")
            .replace(/\[AssociatedPersonTitleH\]/g, "")
            .replace(/\[AssociatedAliya\]/g, "")
            .replace(/\[AssociatedTribe\]/g, "")
            .replace(/\[AssociatedTribeH\]/g, "")
            .replace(/\[AssociatedAliyaH\]/g, "")
            .replace(/\[AssociatedCallNameH\]/g, "")
            .replace(/\[AssociatedAnniversary\]/g, "")
            .replace(/\[AssociatedFatherName\]/g, "")
            .replace(/\[AssociatedFatherNameH\]/g, "")
            .replace(/\[AssociatedMotherName\]/g, "")
            .replace(/\[AssociatedMotherNameH\]/g, "")
            .replace(/\[AssociatedDeceasedDate\]/g, "")
            .replace(/\[AssociatedGender\]/g, "")
            .replace(/\[AssociatedMarried\]/g, "")
            .replace(/\[AssociatedFamilyOf\]/g, "")
            .replace(/\[AssociatedDOB\]/g, "")
            .replace(/\[AssociatedSSN\]/g, "")
            .replace(/\[AssociatedFatherFirstName\]/g, "")
            .replace(/\[AssociatedFatherLastName\]/g, "")
            .replace(/\[AssociatedFatherFirstNameH\]/g, "")
            .replace(/\[AssociatedFatherLastNameH\]/g, "")
            .replace(/\[AssociatedFatherTitle\]/g, "")
            .replace(/\[AssociatedFatherTitleH\]/g, "")
            .replace(/\[AssociatedFatherSuffix\]/g, "")
            .replace(/\[AssociatedFatherMiddleName\]/g, "")
            .replace(/\[AssociatedFatherCallName\]/g, "")
            .replace(/\[AssociatedFatherCallNameH\]/g, "")

            .replace(/\[AssociatedMotherFirstName\]/g, "")
            .replace(/\[AssociatedMotherLastName\]/g, "")
            .replace(/\[AssociatedMotherFirstNameH\]/g, "")
            .replace(/\[AssociatedMotherLastNameH\]/g, "")
            .replace(/\[AssociatedMotherTitle\]/g, "")
            .replace(/\[AssociatedMotherTitleH\]/g, "")
            .replace(/\[AssociatedMotherSuffix\]/g, "")
            .replace(/\[AssociatedMotherMiddleName\]/g, "")
            .replace(/\[AssociatedMotherCallName\]/g, "")
            .replace(/\[AssociatedMotherCallNameH\]/g, "");
        //generic
        //need to put field
    },
    ReverseMergeField: function (dataStr) {
        dataStr = dataStr.replace(new RegExp((selectedPersonName == "" ? null : selectedPersonName), 'g'), "[Name]")
            .replace(new RegExp((selectedPersonBalance == "" ? null : selectedPersonBalance), 'g'), "[Balance]")
            //.replace(new RegExp(selectedCategoryDescription, 'g'), "[Category]")
            //.replace(new RegExp(selectedCategory, 'g'), "[Category]")

            .replace(new RegExp((ledgerHtml == "" ? null : ledgerHtml), 'g'), "[StatementFormat1]")
            .replace(new RegExp((ledgerHtml1 == "" ? null : ledgerHtml1), 'g'), "[StatementFormat2]")
            .replace(new RegExp((selectedPersonAddress == "" ? null : selectedPersonAddress), 'g'), "[Address]")
            .replace(new RegExp((selectedUserPhone == "" ? null : selectedUserPhone), 'g'), "[Phone]")
            .replace(new RegExp((selectedUserEmail == "" ? null : selectedUserEmail), 'g'), "[Email]")
            .replace(new RegExp((selectedPersonHebrewName == "" ? null : selectedPersonHebrewName), 'g'), "[HebrewName]")
            .replace(new RegExp((selectedPersonCallName == "" ? null : selectedPersonCallName), 'g'), "[CallName]")
            .replace(new RegExp((selectedPersonAliya == "" ? null : selectedPersonAliya), 'g'), "[Aliya]")
            .replace(new RegExp((selectedPersonTribe == "" ? null : selectedPersonTribe), 'g'), "[Tribe]")
            .replace(new RegExp((selectedPersonTribeH == "" ? null : selectedPersonTribeH), 'g'), "[TribeH]")
            .replace(new RegExp((selectedPersonAliyaH == "" ? null : selectedPersonAliyaH), 'g'), "[AliyaH]")
            .replace(new RegExp((selectedPersonCallNameH == "" ? null : selectedPersonCallNameH), 'g'), "[CallNameH]")
            .replace(new RegExp((common.ToJSDate(selectedPersonAnniversary) == "" ? null : common.ToJSDate(selectedPersonAnniversary)), 'g'), "[Anniversary]")
            .replace(new RegExp((selectedPersonFatherName == "" ? null : selectedPersonFatherName), 'g'), "[FatherName]")
            .replace(new RegExp((selectedPersonMotherName == "" ? null : selectedPersonMotherName), 'g'), "[MotherName]")
            .replace(new RegExp((Deceased == "" ? null : Deceased), 'g'), "[Deceased]")
            .replace(new RegExp((DeceasedDate == "" ? null : DeceasedDate), 'g'), "[DeceasedDate]")
            .replace(new RegExp((Gender == "" ? null : Gender), 'g'), "[Gender]")
            .replace(new RegExp((Married == "" ? null : Married), 'g'), "[Married]")
            .replace(new RegExp((FamilyOf == "" ? null : FamilyOf), 'g'), "[FamilyOf]")
            .replace(new RegExp((DOB == "" ? null : DOB), 'g'), "[DOB]")
            .replace(new RegExp((SSN == "" ? null : SSN), 'g'), "[SSN]")
            .replace(new RegExp((selectedPersonBusinessPhone == "" ? null : selectedPersonBusinessPhone), 'g'), "[BusinessPhone]")
            .replace(new RegExp((selectedPersonHomePhone == "" ? null : selectedPersonHomePhone), 'g'), "[HomePhone]")
            .replace(new RegExp((selectedPersonEmail == "" ? null : selectedPersonEmail), 'g'), "[Email]")
            //category
            .replace(new RegExp((selectedCategory == "" ? null : selectedCategory.trim()), 'g'), "[Category]")
            .replace(new RegExp((selectedCategoryDescription == "" ? null : selectedCategoryDescription), 'g'), "[CategoryDescription]")
            ////user              
            .replace(new RegExp((UserFirstName == "" ? null : UserFirstName), 'g'), "[UserFirstName]")
            .replace(new RegExp((UserLastName == "" ? null : UserLastName), 'g'), "[UserLastName]")
            .replace(new RegExp((UserAddress == "" ? null : UserAddress), 'g'), "[UserAddress]")
            .replace(new RegExp((UserPhone == "" ? null : UserPhone), 'g'), "[UserPhone]")
            .replace(new RegExp((UserEmail == "" ? null : UserEmail), 'g'), "[UserEmail]")
            //organization      
            .replace(new RegExp((organizationName == "" ? null : organizationName), 'g'), "[OrganizationName]")
            .replace(new RegExp((organizationHebrewName == "" ? null : organizationHebrewName), 'g'), "[OrganizationHebrewName]")

        return dataStr;
    },
    onSendEmailSuccess: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            if (d != -1) {
                if (d == 1) {
                    notifiy.notification('success', 'Email sent successfully', 'success');
                } else if (d == -2) {
                    notifiy.notification('warning', 'No email address with statement preference', 'warning');
                }
            } else {
                notifiy.notification('danger', 'Something went wrong!', 'danger');
            }
        }
    },
    onGetStatementFormatsForOrganizationByFormatIdSuccess: function (d, s, e) {
        if (s == 'success') {
            if (d != -1) {
                $("#formatContent").html(d.FormatContent);
                PrintReport.GetAllSavedTemplates();
                $("#statementLedgerDiv").html(ledgerHtml);
            }
        }
    },
    GetStatementFormats: function () {
        loader.showloader();
        ajaxrepository.callService('/Account/GetAllStatementFormatsForOrganization', '', PrintReport.onSuccessGetAllStatementFormatsForOrganization, commonTemplate.onError, undefined)
    },
    onSuccessGetAllStatementFormatsForOrganization: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            var formatOption = "";
            if (d != -1 && d.length > 0) {
                $.each(d, function (index, value) {
                    if (value.IsDefault == true)
                        $("#formatContent").html(value.FormatContent);
                });
            }
            //$.each(d, function (index, value) {
            //    if (value.IsDefault == true) {
            //        formatOption += "<option value=" + value.FormatID + " selected>" + value.FormatName + " (Default)" + "</option>"
            //    } else {
            //        formatOption += "<option value=" + value.FormatID + ">" + value.FormatName + "</option>"
            //    }
            //});

            //$("#ddlTemplate").html(formatOption);

            // to check if send multiple or single statement
            if (objPeopleFilterVmForStatement != null) {
                if (objPeopleFilterVmForStatement.isForMultiplePerson == true) {
                    //if (objPeopleFilterVmForStatement.hasNoEmailSetup == true) {
                    $("#btnPrintStatementAll").removeClass('d-none')
                    //} else if (objPeopleFilterVmForStatement.hasNoEmailSetup == false) {
                    $("#btnEmailStatementAll").removeClass('d-none')
                    // }
                    $("#personCounterEmail").removeClass('d-none')
                    $("#personCounterPrint").removeClass('d-none')
                    $("#hdnCategoryId").val(objPeopleFilterVmForStatement.CategoryId)
                    $("#pageHeading").html("Statement report preview")
                    $("#personCounterEmail").html(peopleCountEmailSetup);
                    $("#personCounterPrint").html(peopleCountNoEmailSetup);
                    PrintReport.getPersonDetailForStatementPreview();
                }
            } else {
                PrintReport.GetLedgerForStatementReport();
                $("#btnPrintStatement").removeClass('d-none')
                $("#btnEmailStatement").removeClass('d-none')
            }
        }
    },
    BindCkEditorWithConfig: function () {
        //CKEDITOR.replace('ckEmailBody', {
        //    allowedContent: true,
        //    //height: 500
        //});
        //CKEDITOR.replace('ckEmailBody');
    },
    GetLedgerForStatementReport: function () {
        //alert("Statement");
        var data = [];
        data.push({ 'name': 'CategoryId', 'value': $("#hdnCategoryId").val() });
        data.push({ 'name': 'StatementFromDate', 'value': common.ToJSDateTime($("#hdnDateForLedger").val()) });
        loader.showloader();
        ajaxrepository.callService('/Account/GetLedgerToPrintStatement', data, PrintReport.onSuccessGetLedgerForStatementReport, commonTemplate.onError, undefined);
    },
    onSuccessGetLedgerForStatementReport: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            if (d != -1) {
                // setting the details for merge fields
                console.log(d);
                //person
                selectedPersonName = d.PersonName ?? "";
                selectedCategoryDescription = d.CategoryDescription ?? "";
                selectedCategory = d.Category ?? "";
                selectedPersonCallName = d.CallName ?? "";
                //selectedPersonHebrewName = d.PersonHebrewName ?? "";
                selectedPersonFirstName = d.PersonFirstName ?? "";
                selectedPersonFirstNameH = d.PersonFirstNameH ?? "";
                selectedPersonLastName = d.PersonLastName ?? "";
                selectedPersonLastNameH = d.PersonLastNameH ?? "";
                selectedPersonTitle = d.PersonTitle ?? "";
                selectedPersonTitleH = d.PersonTitleH ?? "";
                selectedPersonSuffixH = d.PersonSuffixH ?? "";
                selectedPersonHebrewName = (selectedPersonTitleH != "" ? selectedPersonTitleH + " " : "") + (selectedPersonFirstNameH != "" ? selectedPersonFirstNameH + " " : "") + (selectedPersonLastNameH != "" ? selectedPersonLastNameH + " " : "") + (selectedPersonSuffixH != "" ? selectedPersonSuffixH + "" : "");
                selectedPersonAliya = d.Aliya ?? "";
                selectedPersonTribe = d.Tribe ?? "";
                selectedPersonTribeH = d.TribeH ?? "";
                selectedPersonAliyaH = d.AliyaH ?? "";
                selectedPersonCallNameH = d.CallNameH ?? "";
                selectedPersonAnniversary = d.Anniversary ?? "";
                selectedPersonFatherName = d.FatherName ?? "";
                selectedPersonMotherName = d.MotherName ?? "";
                selectedPersonAddress = d.Address ?? "";
                if (d.PrintName != null && d.PrintName == true) {
                    // print the person name along with formatted address
                    selectedPersonFormattedAddress = `<span>${selectedPersonName}</span><br/>` + displayAddressFormat(d.HomeAddress);
                } else {
                    selectedPersonFormattedAddress = displayAddressFormat(d.HomeAddress)
                }
                selectedPersonBusinessPhone = d.BusinessPhone != null ? d.BusinessPhone : "";
                selectedPersonHomePhone = d.HomePhone != null ? d.HomePhone : "";
                //FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                Anniversary = d.Anniversary != null ? common.ToJSDate(d.Anniversary) : "";
                DOB = d.DOB != null ? common.ToJSDate(d.DOB) : "";
                DeceasedDate = d.DeceasedDate != null ? common.ToJSDate(d.DeceasedDate) : "";
                SSN = d.SSN != null ? d.SSN : "";
                Married = d.Married != null ? d.Married : "";
                Gender = d.Gender != null ? d.Gender : "";
                selectedPersonEmail = d.selectedPersonEmail != null ? d.selectedPersonEmail : "";
                //user
                UserAddress = d.User.Address ?? "";
                UserEmail = d.User.Email ?? "";
                UserPhone = d.User.PhoneNo ?? "";
                UserFirstName = d.User.FirstName ?? "";
                UserLastName = d.User.LastName ?? "";
                // father detail
                selectedPersonFatherFirstName = d.FatherFirstName ?? "";
                selectedPersonFatherLastName = d.FatherLastName ?? "";
                selectedPersonFatherFirstNameH = d.FatherFirstNameH ?? "";
                selectedPersonFatherLastNameH = d.FatherLastNameH ?? "";
                selectedPersonFatherTitle = d.FatherTitle ?? "";
                selectedPersonFatherTitleH = d.FatherTitleH ?? "";
                selectedPersonFatherSuffix = d.FatherSuffix ?? "";
                selectedPersonFatherMiddleName = d.FatherMiddleName ?? "";
                selectedPersonFatherCallName = d.FatherCallName ?? "";
                selectedPersonFatherCallNameH = d.FatherCallNameH ?? "";

                //selectedPersonFatherNameH = "" + selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + " " : "" + selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "" + selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "" + selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH : "" + "";
                selectedPersonFatherNameH = (selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH + " " : "") + (selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "") + (selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "") + (selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + "" : "");

                // mother detail
                selectedPersonMotherFirstName = d.MotherFirstName ?? "";
                selectedPersonMotherLastName = d.MotherLastName ?? "";
                selectedPersonMotherFirstNameH = d.MotherFirstNameH ?? "";
                selectedPersonMotherLastNameH = d.MotherLastNameH ?? "";
                selectedPersonMotherTitle = d.MotherTitle ?? "";
                selectedPersonMotherTitleH = d.MotherTitleH ?? "";
                selectedPersonMotherSuffix = d.MotherSuffix ?? "";
                selectedPersonMotherMiddleName = d.MotherMiddleName ?? "";
                selectedPersonMotherCallName = d.MotherCallName ?? "";
                selectedPersonMotherCallNameH = d.MotherCallNameH ?? "";

                selectedPersonMotherNameH = (selectedPersonMotherTitleH != "" ? selectedPersonMotherTitleH + " " : "") + (selectedPersonMotherFirstNameH != "" ? selectedPersonMotherFirstNameH + " " : "") + (selectedPersonMotherLastNameH != "" ? selectedPersonMotherLastNameH + " " : "") + (selectedPersonMotherSuffix != "" ? selectedPersonMotherSuffix + "" : "");
                //organization
                organizationName = d.Organization.Name ?? "";
                organizationHebrewName = d.Organization.HebrewName ?? "";
                organizationAddress = d.Organization.Address != null ? d.Organization.Address : "";
                //organizationLogo = `<img src="/Images/${d.Organization.OrganizationLogoName}" style="width:120px;" alt="Organization Logo"/>`// needs to be change with path
                if (d.Organization.OrganizationLogoName != null && d.Organization.OrganizationLogoName != "") {
                    organizationLogo = `<img src="${window.location.origin}/Images/${d.Organization.OrganizationLogoName}" style="width:120px;" alt="Organization Logo"/>`// needs to be change with path
                } else {
                    organizationLogo = "";
                }
                var totalBill = 0;
                var totalPaid = 0;
                //ledgerHtml = "<table class='table-bordered' style='width:100%;'><thead><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr><thead><tbody>";
                ledgerHtml = "<table border='1' style='width:80%;border-collapse: collapse;margin: 0 auto;color: #212529;'><thead style='background-color: #3f51b5 !important;color: #fff !important;'><tr><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                ledgerHtml1 = "<table border='1' style='width:70%;border-collapse: collapse;margin: 0 auto;'><thead style='background-color: #4CAF50;color:white;'><tr><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                //ledgerHtml1 = "<table border='1' style='width:70%;border-collapse: collapse;margin: 0 auto;'><thead><tr style='background-color: #4CAF50; color:white;text-align: center!important;'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                ledgerHtml += "<tr><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                //ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";

                $.each(d.MasterLedgerVm.lstLedger, function (index, record) {
                    if (record.Bill > 0) {
                        totalBill += record.Bill;
                        ledgerHtml += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                        if ((index + 1) % 2 == 0)
                            ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                        else
                            ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                    } else {
                        totalPaid += record.Paid;
                        ledgerHtml += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                        if ((index + 1) % 2 == 0)
                            ledgerHtml1 += "<tr style='background-color: #f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                        else
                            ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                    }
                });
                if (d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1] != undefined) {
                    ledgerHtml += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";


                    ledgerHtml1 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                    selectedPersonBalance = d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance;
                } else {
                    ledgerHtml += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + 0 + "</td></tr>";


                    ledgerHtml1 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + 0 + "</td></tr>";

                }
                ledgerHtml += "</tbody></table>";
                ledgerHtml1 += "</tbody></table>";
                //$("#statementLedgerDiv").html(ledgerHtml);
                PrintReport.GetAllSavedTemplates();
            }
        } else {
            commonTemplate.onError();
        }
    },
    GetAllSavedTemplates: function () {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = []; var catID = "";
        if ($("#ViewId").val() == "Statement_Report") {
            sURLVariables = sPageURL.split('&');
            var req = sURLVariables[1];
            req = req.split('=');
            catID = req[1];
        }
        else if ($("#ViewId").val() == "Statement_Report_Preview") {
            sURLVariables = sPageURL.split('=');
            catID = sURLVariables[1];

        }
        var data = [];
        data.push({ 'name': 'categoryId', 'value': catID });
        loader.showloader()
        ajaxrepository.callService('/Account/GetAllEmailTemplatesForCategory', data, PrintReport.onSuccessGetAllEmailTemplatesForCategory, commonTemplate.onError, undefined);
    },
    onSuccessGetAllEmailTemplatesForCategory: function (d, s, e) {
        $("#contentContainer").css('background', '').css('background-repeat', '').css('background-size', '');
        //display background for letter only
        var backGroundImagePath = "";
        loader.hideloader();
        if (s == 'success') {
            if (d != -1) {
                //console.log(d);
                var defaultTemplate = "";
                var optionForTemplates = "";
                if (d != -1) {
                    templateList = d;
                    for (var ctr = 0; ctr < d.length; ctr++) {

                        if (d[ctr].IsDefault) {
                            defaultTemplate = d[ctr];
                            optionForTemplates += "<option value='" + d[ctr].TemplateId + "' selected>" + d[ctr].TemplateName + " (Default)" + "</option>"
                        } else {
                            optionForTemplates += "<option value='" + d[ctr].TemplateId + "'>" + d[ctr].TemplateName + "</option>"
                        }
                    }
                    if (templateList.length == 0) {
                        optionForTemplates += "<option value=''>-Template-</option>"
                    }
                }

                if (defaultTemplate == "" && d.length > 0) {
                    defaultTemplate = d[0];
                }
                $("#ddlTemplate").html(optionForTemplates);
                $("#ddlTemplate").html(optionForTemplates).change();


                if (defaultTemplate != "") {
                    templateAttachmentPath = defaultTemplate.TemplateFilesPath;
                    var txt = "<table>";
                    if (defaultTemplate.AttachmentFileName.length > 0) {
                        var templateAttachements = defaultTemplate.AttachmentFileName;

                        $.each(templateAttachements, function (index, value) {
                            defaultTemplateAttachments.push(value);
                            // txt += "<tr><td><a href='" + templateAttachmentPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td><td><i class='btn fa fa-trash' style='color:red;font-size:25px;' data-file='" + value.AttachmentGuid + "'></i></td></tr>";
                            txt += "<tr><td><a href='" + templateAttachmentPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td></tr>";
                        });
                    }
                    txt += "</table>";
                    document.getElementById("fileAttachmentPreviewNames").innerHTML = "ExistingAttachments:<br>" + txt;
                    if (defaultTemplate.BackgroundFile != null) {
                        $("#hdnBackgroundImage").val(defaultTemplate.TemplateFilesPath + defaultTemplate.BackgroundFile);
                        var backGroundImagePath = location.origin + defaultTemplate.TemplateFilesPath + defaultTemplate.BackgroundFile;
                        $("#contentContainer").css('background', 'url("' + backGroundImagePath + '")').css('background-repeat', 'no-repeat').css('background-size', '100% 100%');
                    }
                    else {
                        $("#hdnBackgroundImage").val('');
                    }

                    if (defaultTemplate.Attachment != null && defaultTemplate.Attachment != "") {
                        $("#hdnAttachments").val(defaultTemplate.Attachment);
                    } else {
                        $("#hdnAttachments").val("");
                    }
                    defaultTemplate.EmailSubject = PrintReport.ReplaceMergeFields(defaultTemplate.EmailSubject);
                    $("#txtEmailSubjectReportPreview").val(defaultTemplate.EmailSubject);
                    //console.log(PrintReport.ReplaceMergeFields(defaultTemplate.EmailBody));
                    $("#ckEmailBodyPreview").html(PrintReport.ReplaceMergeFields(defaultTemplate.EmailBody));
                    // CKEDITOR.instances['ckEmailBody'].setData(PrintReport.ReplaceMergeFields(defaultTemplate.EmailBody));
                    $("#statementHeader").html(PrintReport.ReplaceMergeFields(defaultTemplate.StatementHeader));
                    //console.log(defaultTemplate.StatementText);
                    //console.log(PrintReport.ReplaceMergeFields(defaultTemplate.StatementText));
                    $("#statementBody").html(PrintReport.ReplaceMergeFields(defaultTemplate.StatementText));
                    //$("#statementBodyReport").html(PrintReport.ReplaceMergeFields(PrintReport.ReplaceMergeFieldsWithHtml(defaultTemplate.StatementText)));
                    $("#statementFooter").html(PrintReport.ReplaceMergeFields(defaultTemplate.StatementFooter));
                    //console.log(PrintReport.ReplaceMergeFields(PrintReport.ReplaceMergeFieldsWithHtml(defaultTemplate.StatementText)));

                }
                if (templateList.length == 0 || defaultTemplate == "") {
                    $("#hdnBackgroundImage").val("");
                    var z = '<label class="myFile form-group">' +
                        '<i class="fa fa-upload" style="font-size:25px;">&nbsp; </i><span id="bgFilePlaceHolder">Choose background</span>' +
                        '<input id="statementBgFile" type="file" onchange="commonTemplate.getAddedBgFileName()" multiple />' +
                        '</label>'
                    $("#bgFileUploadDiv").append(z);
                    $("#attachmentPlaceHolder").text('Choose attachment');
                    $("#hdnAttachments").val("");
                    $("#hdnAttachmentsPath").val("");
                    $("#hdnBackgroundImage").val("");
                }
                $("#attachemtnSelectedFileDiv").children().remove();

            }
        }
    },
    getPersonDetailForStatementPreview: function () {
        loader.showloader();
        var formData = new FormData();
        formData.append("objPeopleFilterVmForStatement", JSON.stringify(objPeopleFilterVmForStatement))
        ajaxrepository.callServiceForPostAttachments('/Functions/GetPersonDetailForStatement', formData, PrintReport.onGetPersonDetailForStatementPreviewSuccess, commonTemplate.OnError, undefined);

    },
    onGetPersonDetailForStatementPreviewSuccess: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            if (d != "" && d != null) {
                //console.log(data)
                var d = JSON.parse(d);
                console.log(d)
                $("#hdnPersonIdforPreview").val(d.SelectedPersonId);
                // setting the details for merge fields
                selectedPersonName = d.PersonName ?? "";
                selectedCategoryDescription = d.CategoryDescription ?? "";
                selectedCategory = d.Category ?? "";
                selectedPersonCallName = d.CallName ?? "";

                selectedPersonFirstName = d.PersonFirstName ?? "";
                selectedPersonFirstNameH = d.PersonFirstNameH ?? "";
                selectedPersonLastName = d.PersonLastName ?? "";
                selectedPersonLastNameH = d.PersonLastNameH ?? "";
                selectedPersonTitle = d.PersonTitle ?? "";
                selectedPersonTitleH = d.PersonTitleH ?? "";
                selectedPersonSuffixH = d.PersonSuffixH ?? "";
                selectedPersonHebrewName = (selectedPersonTitleH != "" ? selectedPersonTitleH + " " : "") + (selectedPersonFirstNameH != "" ? selectedPersonFirstNameH + " " : "") + (selectedPersonLastNameH != "" ? selectedPersonLastNameH + " " : "") + (selectedPersonSuffixH != "" ? selectedPersonSuffixH + "" : "");

                //selectedPersonHebrewName = d.PersonHebrewName ?? "";

                selectedPersonAliya = d.Aliya ?? "";
                selectedPersonTribe = d.Tribe ?? "";
                selectedPersonTribeH = d.TribeH ?? "";
                selectedPersonAliyaH = d.AliyaH ?? "";
                selectedPersonCallNameH = d.CallNameH ?? ""
                selectedPersonAnniversary = d.Anniversary ?? "";
                selectedPersonAddress = d.Address ?? "";
                if (d.PrintName != null && d.PrintName == true) {
                    // print the person name along with formatted address
                    selectedPersonFormattedAddress = d.HomeAddress != null ? `<span>${selectedPersonName}</span><br/>` + displayAddressFormat(d.HomeAddress) : "";
                } else {
                    selectedPersonFormattedAddress = d.HomeAddress != null ? displayAddressFormat(d.HomeAddress) : "";
                }

                selectedPersonBusinessPhone = d.BusinessPhone != null ? d.BusinessPhone : "";
                selectedPersonHomePhone = d.HomePhone != null ? d.HomePhone : "";
                //FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                Anniversary = d.Anniversary != null ? common.ToJSDate(d.Anniversary) : "";
                DOB = d.DOB != null ? common.ToJSDate(d.DOB) : "";
                DeceasedDate = d.DeceasedDate != null ? common.ToJSDate(d.DeceasedDate) : "";
                SSN = d.SSN != null ? d.SSN : "";
                Married = d.Married != null ? d.Married : "";
                Gender = d.Gender != null ? d.Gender : "";
                selectedPersonEmail = d.selectedPersonEmail != null ? d.selectedPersonEmail : "";
                //user
                UserAddress = d.User.Address ?? "";
                UserEmail = d.User.Email ?? "";
                UserPhone = d.User.PhoneNo ?? "";
                UserFirstName = d.User.FirstName ?? "";
                UserLastName = d.User.LastName ?? "";
                //organization
                organizationName = d.Organization.Name ?? "";
                organizationHebrewName = d.Organization.HebrewName ?? "";
                organizationAddress = d.Organization.Address != null ? d.Organization.Address : "";
                if (d.Organization.OrganizationLogoName != null && d.Organization.OrganizationLogoName != "") {

                    organizationLogo = `<img src="/Images/${d.Organization.OrganizationLogoName}" style="width:120px;" alt="Organization Logo"/>`// needs to be change with path
                } else {
                    organizationLogo = "";
                }
                // father detail
                selectedPersonFatherName = d.FatherName ?? "";
                selectedPersonFatherFirstName = d.FatherFirstName ?? "";
                selectedPersonFatherLastName = d.FatherLastName ?? "";
                selectedPersonFatherFirstNameH = d.FatherFirstNameH ?? "";
                selectedPersonFatherLastNameH = d.FatherLastNameH ?? "";
                selectedPersonFatherTitle = d.FatherTitle ?? "";
                selectedPersonFatherTitleH = d.FatherTitleH ?? "";
                selectedPersonFatherSuffix = d.FatherSuffix ?? "";
                selectedPersonFatherMiddleName = d.FatherMiddleName ?? "";
                selectedPersonFatherCallName = d.FatherCallName ?? "";
                selectedPersonFatherCallNameH = d.FatherCallNameH ?? "";
                //selectedPersonFatherNameH = "" + selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + " " : "" + selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "" + selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "" + selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH : "" + "";
                selectedPersonFatherNameH = (selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH + " " : "") + (selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "") + (selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "") + (selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + "" : "");

                // mother detail
                selectedPersonMotherName = d.MotherName ?? "";
                selectedPersonMotherFirstName = d.MotherFirstName ?? "";
                selectedPersonMotherLastName = d.MotherLastName ?? "";
                selectedPersonMotherFirstNameH = d.MotherFirstNameH ?? "";
                selectedPersonMotherLastNameH = d.MotherLastNameH ?? "";
                selectedPersonMotherTitle = d.MotherTitle ?? "";
                selectedPersonMotherTitleH = d.MotherTitleH ?? "";
                selectedPersonMotherSuffix = d.MotherSuffix ?? "";
                selectedPersonMotherMiddleName = d.MotherMiddleName ?? "";
                selectedPersonMotherCallName = d.MotherCallName ?? "";
                selectedPersonMotherCallNameH = d.MotherCallNameH ?? "";
                selectedPersonMotherNameH = (selectedPersonMotherTitleH != "" ? selectedPersonMotherTitleH + " " : "") + (selectedPersonMotherFirstNameH != "" ? selectedPersonMotherFirstNameH + " " : "") + (selectedPersonMotherLastNameH != "" ? selectedPersonMotherLastNameH + " " : "") + (selectedPersonMotherSuffix != "" ? selectedPersonMotherSuffix + "" : "");





                //selectedPersonName = d.PersonName;
                peopleCountEmailSetup = d.peopleCountEmailSetup
                peopleCountNoEmailSetup = d.peopleCountNoEmailSetup
                // selectedCategoryDescription = d.CategoryDescription;
                var totalBill = 0;
                var totalPaid = 0;
                if (d.MasterLedgerVm.lstLedger.length > 0) {
                    //ledgerHtml = "<table class='table-bordered' style='width:100%;'><thead><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr><thead><tbody>";
                    ledgerHtml = "<table border='1' style='width:80%;border-collapse: collapse;margin: 0 auto;color: #212529;'><thead style='background-color: #3f51b5 !important;color: #fff !important;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                    ledgerHtml1 = "<table border='1' style='width:70%;border-collapse: collapse;margin: 0 auto;'><thead style='background-color: #4CAF50;color:white;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                    ledgerHtml += "<tr><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                    ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                    $.each(d.MasterLedgerVm.lstLedger, function (index, record) {
                        if (record.Bill > 0) {
                            totalBill += record.Bill;
                            ledgerHtml += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                            if ((index + 1) % 2 == 0)
                                ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                            else
                                ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                        } else {
                            totalPaid += record.Paid;
                            ledgerHtml += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                            if ((index + 1) % 2 == 0)
                                ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                            else
                                ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                        }
                    });
                    if (d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1] != undefined) {
                        ledgerHtml += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                        selectedPersonBalance = d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance;
                    } else {
                        ledgerHtml += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + 0 + "</td></tr>";

                    }
                    if (d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1] != undefined) {
                        ledgerHtml1 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                        selectedPersonBalance = d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance;

                    } else {
                        ledgerHtml1 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + 0 + "</td></tr>";

                    }
                    ledgerHtml += "</tbody></table>";
                    ledgerHtml1 += "</tbody></table>";
                    //$("#statementLedgerDiv").html(ledgerHtml);
                    $("#personCounterEmail").html(peopleCountEmailSetup);
                    $("#personCounterPrint").html(peopleCountNoEmailSetup + peopleCountEmailSetup);
                }
                PrintReport.GetAllSavedTemplates();
            }
        }
    },
    EmailStatementToAll: function () {
        var statementHeader = CKEDITOR.instances.txtStatementHeader.getData();
        var statementBody = CKEDITOR.instances.ckStatementBody.getData();
        var statementFooter = CKEDITOR.instances.txtStatementFooter.getData();
        var statementFormatId = $('#ddlTemplate').val();
        var mailStatementContent = $("#formatContent").html();
        //var subject = $("#txtEmailSubjectReport").val();
        var subject = $("#txtEmailSubject").val();
        //subject = PrintReport.ReverseMergeField(subject);
        //var dataFromEditor = CKEDITOR.instances.ckEmailBody.getData();
        var dataFromEditor = CKEDITOR.instances.editor1.getData();
        //dataFromEditor = PrintReport.ReverseMergeField(dataFromEditor);
        var fileUpload = $("#fileAttachmentReport").get(0);
        var addStatementAsAttachment = $("#addStatementAsAttachment").is(':checked');

        var files = fileUpload.files;

        var backgroundImage = $("#contentContainer").css('background-image');
        //$("#contentContainer").css('background', `${backgroundImage} 0% 0% / 100% 100% no-repeat`);
        //console.log($("#contentContainer").html());

        // Create FormData object  
        var fileData = new FormData();
        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }
        if (defaultTemplateAttachments.length > 0) {
            var finalArray = defaultTemplateAttachments.map(function (obj) {
                return obj.AttachmentGuid;
            });
            fileData.append('attachments', finalArray.join(','));
        }
        fileData.append('subject', subject);
        fileData.append('mailStatementContent', mailStatementContent.toString());
        fileData.append('mailTemplateContent', dataFromEditor.toString());
        fileData.append('templateAttachmentPath', templateAttachmentPath);
        fileData.append('statementHeader', statementHeader);
        fileData.append('statementBody', statementBody);
        fileData.append('backgroundUrl', backgroundImage);
        fileData.append('statementFooter', statementFooter);
        fileData.append('statementFormatId', statementFormatId);
        fileData.append('addStatementAsAttachment', addStatementAsAttachment);
        fileData.append('attachmentType', 'Statement');
        loader.showloader();
        ajaxrepository.callServiceForPostAttachments('/Functions/EmailStatementToAll', fileData, PrintReport.onEmailStatementToAllSuccess, commonTemplate.onError, undefined);
    },
    onEmailStatementToAllSuccess: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            if (d != -1) {
                if (d == 1) {
                    notifiy.notification('success', 'Email sent. Check email log for more detail', 'success');
                } else if (d == -2) {
                    notifiy.notification('warning', 'No email address with statement preference', 'warning');
                } else if (d == 2) {
                    notifiy.notification('info', 'No people matches with current filter', 'info');
                }
            } else {
                notifiy.notification('danger', 'Something went wrong!', 'danger');
            }
        }
    },
    resetDataUsedForMultipleStatement: function () {
        $("#hdnCategoryId").val()
        $("#pageHeading").html("Statement report")
        localStorage.removeItem('objPeopleFilterVmForStatement');
    },
    casePrintOnly: function () {
        $("#personCounterPrint").removeClass('d-none')
        //$("#personCounterPrint").removeClass('d-none')
        $('#emailStatementDiv').addClass("d-none")
        $('#btnEmailStatementDiv').addClass("d-none")
        //$("#StatementSettingEmailDiv").prop('disabled', true);
    },
    caseSendMultipleStatement: function () {

    },
    getMultipleStatement: function () {
        loader.showloader();
        var fileData = new FormData();
        ajaxrepository.callServiceWithPost('/Functions/GetMultipleStatement', '', PrintReport.onGetMultipleStatementSuccess, commonTemplate.onError, undefined);
    },
    onGetMultipleStatementSuccess: function (d, s, e) {
        if (s == 'success') {
            //console.log(d);
            if (d != -1) {
                if (d.length > 0) {
                    var data = $('#printStatementDiv').html();
                    var backgroundImage = $("#contentContainer").css('background-image');
                    var statementHeader = CKEDITOR.instances.txtStatementHeader.getData();
                    var statementBody = CKEDITOR.instances.ckStatementBody.getData();
                    var statementFooter = CKEDITOR.instances.txtStatementFooter.getData();
                    var statementContent = document.createElement('div');
                    statementContent.id = "statementContentDiv";
                    statementContent.style.margin = "0 auto";

                    // set the image as the background of statement Content Div
                    if (backgroundImage != null) {
                        //statementContent.style.backgroundImage = `${backgroundImage}`;
                        //statementContent.style.backgroundRepeat = 'repeat';
                        //statementContent.style.backgroundSize = 'contain';
                    }

                    //var format = PrintReport.ReverseMergeField(data)
                    //$(statementContent).append(format)
                    //$(statementContent).find("table").remove();
                    //$("#statementContentDiv #statementLedgerDiv").html("");
                    //console.log(statementContent)
                    $.each(d, function (key, d) {
                        //if (key == 1) return false;
                        var personDetail = {};
                        selectedPersonName = d.PersonName;
                        selectedCategoryDescription = d.CategoryDescription ?? "";
                        selectedCategory = d.Category ?? "";
                        selectedPersonCallName = d.CallName ?? "";

                        selectedPersonFirstName = d.PersonFirstName ?? "";
                        selectedPersonFirstNameH = d.PersonFirstNameH ?? "";
                        selectedPersonLastName = d.PersonLastName ?? "";
                        selectedPersonLastNameH = d.PersonLastNameH ?? "";
                        selectedPersonTitle = d.PersonTitle ?? "";
                        selectedPersonTitleH = d.PersonTitleH ?? "";
                        selectedPersonSuffixH = d.PersonSuffixH ?? "";
                        selectedPersonHebrewName = (selectedPersonTitleH != "" ? selectedPersonTitleH + " " : "") + (selectedPersonFirstNameH != "" ? selectedPersonFirstNameH + " " : "") + (selectedPersonLastNameH != "" ? selectedPersonLastNameH + " " : "") + (selectedPersonSuffixH != "" ? selectedPersonSuffixH + "" : "");

                        //selectedPersonHebrewName = d.PersonHebrewName ?? "";
                        selectedPersonAliya = d.Aliya ?? "";
                        selectedPersonTribe = d.Tribe ?? "";
                        selectedPersonTribeH = d.TribeH ?? "";
                        selectedPersonAliyaH = d.AliyaH ?? "";
                        selectedPersonCallNameH = d.CallNameH ?? ""
                        selectedPersonAnniversary = d.Anniversary ?? "";
                        selectedPersonFatherName = d.FatherName ?? "";
                        selectedPersonMotherName = d.MotherName ?? "";
                        selectedPersonAddress = d.Address ?? "";
                        debugger
                        if (d.PrintName != null && d.PrintName == true) {
                            // print the person name along with formatted address
                            selectedPersonFormattedAddress = d.HomeAddress != null ? `<span>${selectedPersonName}</span><br/>` + displayAddressFormat(d.HomeAddress) : "";
                        } else {
                            selectedPersonFormattedAddress = d.HomeAddress != null ? displayAddressFormat(d.HomeAddress) : "";
                        }
                        selectedPersonBusinessPhone = d.BusinessPhone != null ? d.BusinessPhone : "";
                        selectedPersonHomePhone = d.HomePhone != null ? d.HomePhone : "";
                        //FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                        FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                        Anniversary = d.Anniversary != null ? common.ToJSDate(d.Anniversary) : "";
                        DOB = d.DOB != null ? common.ToJSDate(d.DOB) : "";
                        DeceasedDate = d.DeceasedDate != null ? common.ToJSDate(d.DeceasedDate) : "";
                        SSN = d.SSN != null ? d.SSN : "";
                        Married = d.Married != null ? d.Married : "";
                        Gender = d.Gender != null ? d.Gender : "";
                        selectedPersonEmail = d.selectedPersonEmail != null ? d.selectedPersonEmail : "";
                        // father detail
                        selectedPersonFatherName = d.FatherName ?? "";
                        selectedPersonFatherFirstName = d.FatherFirstName ?? "";
                        selectedPersonFatherLastName = d.FatherLastName ?? "";
                        selectedPersonFatherFirstNameH = d.FatherFirstNameH ?? "";
                        selectedPersonFatherLastNameH = d.FatherLastNameH ?? "";
                        selectedPersonFatherTitle = d.FatherTitle ?? "";
                        selectedPersonFatherTitleH = d.FatherTitleH ?? "";
                        selectedPersonFatherSuffix = d.FatherSuffix ?? "";
                        selectedPersonFatherMiddleName = d.FatherMiddleName ?? "";
                        selectedPersonFatherCallName = d.FatherCallName ?? "";
                        selectedPersonFatherCallNameH = d.FatherCallNameH ?? "";
                        selectedPersonFatherNameH = (selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH + " " : "") + (selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "") + (selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "") + (selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + "" : "");
                        // mother detail
                        selectedPersonMotherName = d.MotherName ?? "";
                        selectedPersonMotherFirstName = d.MotherFirstName ?? "";
                        selectedPersonMotherLastName = d.MotherLastName ?? "";
                        selectedPersonMotherFirstNameH = d.MotherFirstNameH ?? "";
                        selectedPersonMotherLastNameH = d.MotherLastNameH ?? "";
                        selectedPersonMotherTitle = d.MotherTitle ?? "";
                        selectedPersonMotherTitleH = d.MotherTitleH ?? "";
                        selectedPersonMotherSuffix = d.MotherSuffix ?? "";
                        selectedPersonMotherMiddleName = d.MotherMiddleName ?? "";
                        selectedPersonMotherCallName = d.MotherCallName ?? "";
                        selectedPersonMotherCallNameH = d.MotherCallNameH ?? "";
                        selectedPersonMotherNameH = (selectedPersonMotherTitleH != "" ? selectedPersonMotherTitleH + " " : "") + (selectedPersonMotherFirstNameH != "" ? selectedPersonMotherFirstNameH + " " : "") + (selectedPersonMotherLastNameH != "" ? selectedPersonMotherLastNameH + " " : "") + (selectedPersonMotherSuffix != "" ? selectedPersonMotherSuffix + "" : "");

                        //user
                        UserAddress = d.User.Address ?? "";
                        UserEmail = d.User.Email ?? "";
                        UserPhone = d.User.PhoneNo ?? "";
                        UserFirstName = d.User.FirstName ?? "";
                        UserLastName = d.User.LastName ?? "";
                        //organization
                        organizationName = d.Organization.Name ?? "";
                        organizationHebrewName = d.Organization.HebrewName ?? "";
                        organizationAddress = d.Organization.Address != null ? d.Organization.Address : "";
                        if (d.Organization.OrganizationLogoName != null && d.Organization.OrganizationLogoName != "") {
                            organizationLogo = `<img src="/Images/${d.Organization.OrganizationLogoName}" style="width:120px;" alt="Organization Logo"/>`// needs to be change with path
                        } else {
                            organizationLogo = "";
                        }

                        if (d.MasterLedgerVm.lstLedger.length > 0) {
                            var PersonBalance = d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance;
                        } else {
                            var PersonBalance = 0;
                        }
                        var personAddress = d.Address;
                        var ledger1 = "";
                        var ledger2 = "";
                        var totalBill = 0;
                        var totalPaid = 0;
                        //ledgerHtml = "<table class='table-bordered' style='width:100%;'><thead><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr><thead><tbody>";
                        if (d.MasterLedgerVm.lstLedger.length > 0) {
                            ledger1 = "<table border='1' style='width:80%;border-collapse: collapse;margin: 0 auto;color: #212529;'><thead style='background-color: #3f51b5 !important;color: #fff !important;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                            ledger2 = "<table border='1' style='width:70%;border-collapse: collapse;margin: 0 auto;'><thead style='background-color: #4CAF50;color:white;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                            ledger1 += "<tr><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                            ledger2 += "<tr style='background-color:#f2f2f2;'><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                            $.each(d.MasterLedgerVm.lstLedger, function (index, record) {
                                if (record.Bill > 0) {
                                    totalBill += record.Bill;
                                    ledger1 += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    if ((index + 1) % 2 == 0) {
                                        ledger2 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    } else {
                                        ledger2 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    }
                                } else {
                                    totalPaid += record.Paid;
                                    ledger1 += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    if ((index + 1) % 2 == 0) {
                                        ledger2 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    } else {
                                        ledger2 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    }
                                }
                            });
                            ledger1 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                            ledger2 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                            ledger1 += "</tbody></table>";
                            ledger2 += "</tbody></table>";
                        } else {
                            ledger1 = "<table border='1' style='width:80%;border-collapse: collapse;margin: 0 auto;color: #212529;'><thead style='background-color: #3f51b5 !important;color: #fff !important;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                            ledger2 = "<table border='1' style='width:80%;border-collapse: collapse;margin: 0 auto;color: #212529;'><thead style='background-color: #3f51b5 !important;color: #fff !important;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                            ledger1 += "<tr><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                            ledger2 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'></td></tr>";
                            ledger1 += "</tbody></table>";
                            ledger2 += "</tbody></table>";
                        }
                        //initializing this because merge field function(PrintReport.ReplaceMergeFields()) has these variable ledgerHtml,ledgerHtml1
                        ledgerHtml = ledger1;
                        ledgerHtml1 = ledger2;

                        //var header = statementHeader.replace(/\[Name\]/g, PersonName).replace(/\[StatementFormat1\]/g, ledger1).replace(/\[StatementFormat2\]/g, ledger2).replace(/\[Balance\]/g, PersonBalance).replace(/\[Address\]/g, personAddress).replace(/\[Category\]/g, CategoryDescription);
                        var header = PrintReport.ReplaceMergeFields(statementHeader);
                        //var body = statementBody.replace(/\[Name\]/g, PersonName).replace(/\[StatementFormat1\]/g, ledger1).replace(/\[StatementFormat2\]/g, ledger2).replace(/\[Balance\]/g, PersonBalance).replace(/\[Address\]/g, personAddress).replace(/\[Category\]/g, CategoryDescription);

                        var body = PrintReport.ReplaceMergeFields(statementBody);

                        //var footer = statementFooter.replace(/\[Name\]/g, PersonName).replace(/\[StatementFormat1\]/g, ledger1).replace(/\[StatementFormat2\]/g, ledger2).replace(/\[Balance\]/g, PersonBalance).replace(/\[Address\]/g, personAddress).replace(/\[Category\]/g, CategoryDescription);
                        var footer = PrintReport.ReplaceMergeFields(statementFooter);
                        //$(statementContent).append(header)
                        debugger
                        isAdditionalText1AlreadyReplaced = true;
                        isAdditionalText2AlreadyReplaced = true;
                        header = commonTemplate.ReplaceAdditionalTextMergeField('statementHeader');

                        body = commonTemplate.ReplaceAdditionalTextMergeField('statementBody');

                        footer = commonTemplate.ReplaceAdditionalTextMergeField('statementFooter');

                        $(statementContent).append(body)
                        //$(statementContent).append(footer)
                        //$(statementContent).find("#statementLedgerDiv").html(body)
                        //$(statementContent).find("#statementFooterReport").html(footer)
                        //$(statementContent).find("#statementHeaderReport").html(header)
                        //$("#statementContentDiv #statementHeaderReport").html(header)
                        //$(statementContent).append($("#statementLedgerDiv").html(ledger))
                        $(statementContent).append("<div style='break-after: page'></div>")
                    });
                    loader.hideloader();

                    $(statementContent).printThis({
                        //importStyle: true,
                        //importCSS: true
                    });
                } else {
                    loader.hideloader();
                    notifiy.notification('info', 'No people matches with current filter', 'info');
                }
            }
        }

    },
    onError: function () {
        loader.hideloader();
        notifiy.notification('danger', "Something went wrong", 'danger');
    }
}
var Receipt = {
    ReplaceMergeFieldsWithHtml: function (dataStr) {
        if (dataStr == null || dataStr == undefined) { dataStr = " " };
        var format1 = defaultReceiptFormats.find(element => element.FormatName === "[ReceiptFormat1]");
        var format2 = defaultReceiptFormats.find(element => element.FormatName === "[ReceiptFormat2]");
        return dataStr.replace(/\[ReceiptFormat1\]/g, format1.FormatValue)
            .replace(/\[ReceiptFormat2\]/g, format2.FormatValue);
    },
    ReplaceMergeFields: function (dataStr) {
        return dataStr.replace(/\[Name\]/g, selectedPersonName)
            .replace(/\[HebrewName\]/g, selectedPersonNameHebrew)
            .replace(/\[PersonFirstName\]/g, personFirstName)
            .replace(/\[PersonLastName\]/g, personLastName)
            .replace(/\[PersonTitle\]/g, personTitle)
            .replace(/\[PersonFirstNameH\]/g, personFirstNameHebrew)
            .replace(/\[PersonLastNameH\]/g, personLastNameHebrew)
            .replace(/\[PersonTitleH\]/g, personTitleHebrew)
            .replace(/\[PersonSuffixH\]/g, personSuffixH)
            .replace(/\[CallName\]/g, callName)
            .replace(/\[CallNameH\]/g, callNameH)
            .replace(/\[Amount\]/g, amount)
            .replace(/\[PaymentDate\]/g, paymentDate)
            .replace(/\[ManualReceipt\]/g, manualReceipt)
            .replace(/\[Solicitor1\]/g, solicitor1)
            .replace(/\[Solicitor2\]/g, solicitor2)
            .replace(/\[Solicitor3\]/g, solicitor3)
            .replace(/\[Solicitor4\]/g, solicitor4)
            .replace(/\[Honoree1\]/g, honoree1)
            .replace(/\[Honoree2\]/g, honoree2)
            .replace(/\[Event1\]/g, event1)
            .replace(/\[Event2\]/g, event2)
            .replace(/\[Address\]/g, address)
            .replace(/\[FormattedAddress\]/g, selectedPersonFormattedAddress)
            //.replace(/\[FatherName\]/g, fatherName)
            //.replace(/\[MotherName\]/g, motherName)
            .replace(/\[ReceiptMessage\]/g, receiptMessage)
            .replace(/\[Aliya\]/g, aliya)
            .replace(/\[Tribe\]/g, tribe)
            .replace(/\[TribeH\]/g, tribeH)
            .replace(/\[AliyaH\]/g, aliyaH)
            .replace(/\[Anniversary\]/g, anniversary)
            .replace(/\[PaymentMethod\]/g, paymentMethod)

            .replace(/\[Deceased\]/g, Deceased)
            .replace(/\[DeceasedDate\]/g, DeceasedDate)
            .replace(/\[Gender\]/g, Gender)
            .replace(/\[FamilyOf\]/g, FamilyOf)
            .replace(/\[DOB\]/g, DOB)
            .replace(/\[SSN\]/g, SSN)
            .replace(/\[Married\]/g, Married)
            .replace(/\[BusinessPhone\]/g, selectedPersonBusinessPhone)
            .replace(/\[HomePhone\]/g, selectedPersonHomePhone)

            //category
            .replace(/\[Category\]/g, selectedCategory)
            .replace(/\[CategoryDescription\]/g, selectedCategoryDescription)

            //user
            .replace(/\[UserFirstName\]/g, UserFirstName)
            .replace(/\[UserLastName\]/g, UserLastName)
            .replace(/\[UserAddress\]/g, UserAddress)
            .replace(/\[UserPhone\]/g, UserPhone)
            .replace(/\[Email\]/g, UserEmail)
            //organization
            .replace(/\[OrganizationName\]/g, organizationName)
            .replace(/\[OrganizationHebrewName\]/g, organizationHebrewName)
            .replace(/\[OrganizationAddress\]/g, organizationAddress)
            .replace(/\[OrganizationLogo\]/g, organizationLogo)
            //father
            .replace(/\[FatherName\]/g, fatherName)
            .replace(/\[FatherCallName\]/g, selectedPersonFatherCallName)
            .replace(/\[FatherCallNameH\]/g, selectedPersonFatherCallNameH)
            .replace(/\[FatherNameH\]/g, selectedPersonFatherNameH)
            .replace(/\[FatherFirstName\]/g, selectedPersonFatherFirstName)
            .replace(/\[FatherLastName\]/g, selectedPersonFatherLastName)
            .replace(/\[FatherFirstNameH\]/g, selectedPersonFatherFirstNameH)
            .replace(/\[FatherLastNameH\]/g, selectedPersonFatherLastNameH)
            .replace(/\[FatherTitle\]/g, selectedPersonFatherTitle)
            .replace(/\[FatherTitleH\]/g, selectedPersonFatherTitleH)
            .replace(/\[FatherSuffix\]/g, selectedPersonFatherSuffix)
            .replace(/\[FatherMiddleName\]/g, selectedPersonFatherMiddleName)
            //mother
            .replace(/\[MotherName\]/g, motherName)
            .replace(/\[MotherCallName\]/g, selectedPersonMotherCallName)
            .replace(/\[MotherCallNameH\]/g, selectedPersonMotherCallNameH)
            .replace(/\[MotherNameH\]/g, selectedPersonMotherNameH)
            .replace(/\[MotherFirstName\]/g, selectedPersonMotherFirstName)
            .replace(/\[MotherLastName\]/g, selectedPersonMotherLastName)
            .replace(/\[MotherFirstNameH\]/g, selectedPersonMotherFirstNameH)
            .replace(/\[MotherLastNameH\]/g, selectedPersonMotherLastNameH)
            .replace(/\[MotherTitle\]/g, selectedPersonMotherTitle)
            .replace(/\[MotherTitleH\]/g, selectedPersonMotherTitleH)
            .replace(/\[MotherSuffix\]/g, selectedPersonMotherSuffix)
            .replace(/\[MotherMiddleName\]/g, selectedPersonMotherMiddleName)
            .replace(/\[AssociatedName\]/g, "")
            .replace(/\[AssociatedAddress\]/g, "")
            .replace(/\[AssociatedCallName\]/g, "")
            .replace(/\[AssociatedPersonFirstName\]/g, "")
            .replace(/\[AssociatedPersonFirstNameH\]/g, "")
            .replace(/\[AssociatedPersonLastName\]/g, "")
            .replace(/\[AssociatedPersonLastNameH\]/g, "")
            .replace(/\[AssociatedPersonSuffixH\]/g, "")
            .replace(/\[AssociatedHebrewName\]/g, "")
            .replace(/\[AssociatedPersonTitle\]/g, "")
            .replace(/\[AssociatedPersonTitleH\]/g, "")
            .replace(/\[AssociatedAliya\]/g, "")
            .replace(/\[AssociatedTribe\]/g, "")
            .replace(/\[AssociatedTribeH\]/g, "")
            .replace(/\[AssociatedAliyaH\]/g, "")
            .replace(/\[AssociatedCallNameH\]/g, "")
            .replace(/\[AssociatedAnniversary\]/g, "")
            .replace(/\[AssociatedFatherName\]/g, "")
            .replace(/\[AssociatedFatherNameH\]/g, "")
            .replace(/\[AssociatedMotherName\]/g, "")
            .replace(/\[AssociatedMotherNameH\]/g, "")
            .replace(/\[AssociatedDeceasedDate\]/g, "")
            .replace(/\[AssociatedGender\]/g, "")
            .replace(/\[AssociatedMarried\]/g, "")
            .replace(/\[AssociatedFamilyOf\]/g, "")
            .replace(/\[AssociatedDOB\]/g, "")
            .replace(/\[AssociatedSSN\]/g, "")
            .replace(/\[AssociatedFatherFirstName\]/g, "")
            .replace(/\[AssociatedFatherLastName\]/g, "")
            .replace(/\[AssociatedFatherFirstNameH\]/g, "")
            .replace(/\[AssociatedFatherLastNameH\]/g, "")
            .replace(/\[AssociatedFatherTitle\]/g, "")
            .replace(/\[AssociatedFatherTitleH\]/g, "")
            .replace(/\[AssociatedFatherSuffix\]/g, "")
            .replace(/\[AssociatedFatherMiddleName\]/g, "")
            .replace(/\[AssociatedFatherCallName\]/g, "")
            .replace(/\[AssociatedFatherCallNameH\]/g, "")

            .replace(/\[AssociatedMotherFirstName\]/g, "")
            .replace(/\[AssociatedMotherLastName\]/g, "")
            .replace(/\[AssociatedMotherFirstNameH\]/g, "")
            .replace(/\[AssociatedMotherLastNameH\]/g, "")
            .replace(/\[AssociatedMotherTitle\]/g, "")
            .replace(/\[AssociatedMotherTitleH\]/g, "")
            .replace(/\[AssociatedMotherSuffix\]/g, "")
            .replace(/\[AssociatedMotherMiddleName\]/g, "")
            .replace(/\[AssociatedMotherCallName\]/g, "")
            .replace(/\[AssociatedMotherCallNameH\]/g, "");
        //generic
        //need to put field

    },
    GetAllDefaultReceiptFormats: function () {
        ajaxrepository.callService('/Receipt/GetAllDefaultReceiptFormats', '', Receipt.GetAllDefaultReceiptFormatsOnSuccess, commonTemplate.OnError, undefined);
    },
    GetAllDefaultReceiptFormatsOnSuccess: function (d, s, e) {
        if (s == 'success') {
            if (d != -1) {
                //console.log(d);
                defaultReceiptFormats = d;
                var paymentId = $("#hiddenPaymentId").val();
                Receipt.GetPaymentReceiptDetailsById(paymentId);
            } else {
                commonTemplate.onError();
            }
        } else {
            commonTemplate.onError();
        }
    },
    onSendEmailSuccess: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            if (d == 1) {
                $("#statementModal").modal('hide');
                $("#reportType").val(1).change();
                notifiy.notification('success', "Email has been sent", 'success');
            } else if (d == -1)
                notifiy.notification('danger', "Email not sent", 'danger');
            else if (d == -2)
                notifiy.notification('danger', "No Email with Statement Preferences, Email was not sent", 'danger');
        } else
            notifiy.notification('danger', "Something went wrong", 'danger');
    },
    onGetReceiptFormatByFormatIdSuccess: function (d, s, e) {
        if (s == 'success') {
            if (d != -1) {
                // console.log(d.FormatContent);
                $("#formatContent").html(d.FormatContent);
                $("#personFirstName").text(personFirstName);
                $("#personLastName").text(personLastName);
                $("#paymentMethod").text(paymentMethod);
                $("#personAddress").html(address);
                $("#receiptAmount").html(amount);
                Receipt.GetAllSavedTemplates();
                // $("#statementLedgerDiv").html(ledgerHtml);
            }
        }
    },
    GetReceiptFormats: function () {
        loader.showloader();
        ajaxrepository.callService('/Receipt/GetReceiptFormats', '', Receipt.GetReceiptFormatsOnSuccess, commonTemplate.OnError, undefined);
    },
    GetReceiptFormatsOnSuccess: function (d, s, e) {
        loader.hideloader();
        debugger
        if (s == 'success') {
            if (d != -1) {
                var formatOption = "";
                if (d != -1 && d.length > 0) {
                    $.each(d, function (index, value) {
                        if (value.IsDefault == true) {
                            $("#formatContent").html(value.FormatContent);
                            console.log(value.FormatContent);
                        }
                    });
                }
                $.each(d, function (index, value) {
                    if (value.IsDefault == true) {
                        formatOption += "<option value=" + value.FormatID + " selected>" + value.FormatName + " (Default)" + "</option>"
                    } else {
                        formatOption += "<option value=" + value.FormatID + ">" + value.FormatName + "</option>"
                    }
                });

                $("#ddlTemplate").html(formatOption);
            } else {
                commonTemplate.OnError();
            }
        } else {
            commonTemplate.OnError();
        }
    },
    GetPaymentReceiptDetailsById: function (paymentId) {
        var data = new Array();
        data.push({ 'name': 'paymentId', 'value': paymentId });
        ajaxrepository.callService('/Receipt/GetPaymentReceiptDetailsById', data, Receipt.GetPaymentReceiptDetailsByIdOnSuccess, commonTemplate.OnError, undefined);
    },
    GetPaymentReceiptDetailsByIdOnSuccess: function (d, s, e) {
        if (s == "success") {
            // after getting the data for receipt generate a html for receipt and render it on the page.
            personTitle = d.PersonTitle;
            personFirstName = d.FirstName;
            personLastName = d.LastName;
            aliya = d.Aliya;
            aliyaH = d.AliyaH;
            tribe = d.Tribe;
            tribeH = d.TribeH;
            personTitleHebrew = d.PersonTitleH;
            personFirstNameHebrew = d.FirstNameH;
            personLastNameHebrew = d.LastNameH;
            personSuffixH = d.PersonSuffixH;

            amount = d.Amount.toFixed(2);
            manualReceipt = d.ManualReceipt == null ? '' : d.ManualReceipt;
            solicitor1 = d.Solicitor1;
            solicitor2 = d.Solicitor2;
            solicitor3 = d.Solicitor3;
            solicitor4 = d.Solicitor4;
            honoree1 = d.Honoree1;
            honoree2 = d.Honoree2;
            event1 = d.Event1;
            event2 = d.Event2;
            personSuffixHebrew = d.PersonSuffixH;
            paymentMethod = d.PaymentMethod;
            paymentDate = common.ToJSDate(d.PaymentDate);
            receiptMessage = d.ReceiptMessage == null ? '' : d.ReceiptMessage;
            selectedPersonName = (personTitle + " " + personFirstName + " " + personLastName).trim();
            selectedPersonNameHebrew = (personTitleHebrew + " " + personFirstNameHebrew + " " + personLastNameHebrew).trim();
            //fatherName = d.FatherName == null ? '' : d.FatherName.trim();
            //motherName = d.MotherName == null ? '' : d.MotherName.trim();
            anniversary = common.ToJSDate(d.Anniversary);
            callName = d.CallName == null ? '' : d.CallName;
            callNameH = d.CallNameH == null ? '' : d.CallNameH;
            var houseNo = d.Address.HouseNo == null ? '' : d.Address.HouseNo;
            var street = d.Address.Street == null ? '' : d.Address.Street;
            var apartment = d.Address.Apartment == null ? '' : "#" + d.Address.Apartment;
            var city = d.Address.City == null ? '' : d.Address.City;
            var zip = d.Address.Zip == null ? '' : d.Address.Zip;
            address = houseNo + " " + street + apartment
            if (city != '' || zip != '') {
                address = address + "</br>" + city
                if (city != '' && zip != '')
                    address = address + ' ,' + zip
                else
                    address += zip;
            }
            "</br>" + city + " ," + zip;
            if (d.Address != null) {
                if (d.Address.PrintName != null && d.Address.PrintName == true) {
                    // print the person name along with formatted address
                    selectedPersonFormattedAddress = `<span>${selectedPersonName}</span><br/>` + displayAddressFormat(d.Address);
                } else {
                    selectedPersonFormattedAddress = displayAddressFormat(d.Address)
                }
            }
            FamilyOf = d.familyOfName != null ? d.familyOfName : "";
            Anniversary = d.Anniversary != null ? common.ToJSDate(d.Anniversary) : "";
            DOB = d.DOB != null ? common.ToJSDate(d.DOB) : "";
            SSN = d.SSN != null ? d.SSN : "";
            Married = d.Married != null ? d.Married : "";
            selectedPersonBusinessPhone = d.BusinessPhone != null ? d.BusinessPhone : "";
            selectedPersonHomePhone = d.HomePhone != null ? d.HomePhone : "";

            // father detail
            fatherName = d.FatherName == null ? '' : d.FatherName.trim();
            selectedPersonFatherFirstName = d.FatherFirstName ?? "";
            selectedPersonFatherLastName = d.FatherLastName ?? "";
            selectedPersonFatherFirstNameH = d.FatherFirstNameH ?? "";
            selectedPersonFatherLastNameH = d.FatherLastNameH ?? "";
            selectedPersonFatherTitle = d.FatherTitle ?? "";
            selectedPersonFatherTitleH = d.FatherTitleH ?? "";
            selectedPersonFatherSuffix = d.FatherSuffix ?? "";
            selectedPersonFatherMiddleName = d.FatherMiddleName ?? "";
            selectedPersonFatherCallName = d.FatherCallName ?? "";
            selectedPersonFatherCallNameH = d.FatherCallNameH ?? "";
            //selectedPersonFatherNameH = "" + selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + " " : "" + selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "" + selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "" + selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH : "" + "";
            selectedPersonFatherNameH = (selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH + " " : "") + (selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "") + (selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "") + (selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + "" : "");

            // mother detail
            motherName = d.MotherName == null ? '' : d.MotherName.trim();
            selectedPersonMotherFirstName = d.MotherFirstName ?? "";
            selectedPersonMotherLastName = d.MotherLastName ?? "";
            selectedPersonMotherFirstNameH = d.MotherFirstNameH ?? "";
            selectedPersonMotherLastNameH = d.MotherLastNameH ?? "";
            selectedPersonMotherTitle = d.MotherTitle ?? "";
            selectedPersonMotherTitleH = d.MotherTitleH ?? "";
            selectedPersonMotherSuffix = d.MotherSuffix ?? "";
            selectedPersonMotherMiddleName = d.MotherMiddleName ?? "";
            selectedPersonMotherCallName = d.MotherCallName ?? "";
            selectedPersonMotherCallNameH = d.MotherCallNameH ?? "";

            selectedPersonMotherNameH = (selectedPersonMotherTitleH != "" ? selectedPersonMotherTitleH + " " : "") + (selectedPersonMotherFirstNameH != "" ? selectedPersonMotherFirstNameH + " " : "") + (selectedPersonMotherLastNameH != "" ? selectedPersonMotherLastNameH + " " : "") + (selectedPersonMotherSuffix != "" ? selectedPersonMotherSuffix + "" : "");

            //user
            UserAddress = d.User.Address == null ? "" : d.User.Address;
            UserEmail = d.User.Email == null ? "" : d.User.Email;
            UserPhone = d.User.PhoneNo == null ? "" : d.User.PhoneNo;
            UserFirstName = d.User.FirstName == null ? "" : d.User.FirstName;
            UserLastName = d.User.LastName == null ? "" : d.User.LastName;
            //organization
            organizationName = d.Organization.Name != null ? d.Organization.Name : "";
            organizationHebrewName = d.Organization.HebrewName != null ? d.Organization.HebrewName : "";
            organizationAddress = d.Organization.Address != null ? d.Organization.Address : "";
            organizationLogo = `<img src="${window.location.origin}/Images/${d.Organization.OrganizationLogoName}" style="width:120px;" alt="Organization Logo"/>`// needs to be change with path
            //category
            selectedCategoryDescription = d.Category.Name;
            selectedCategory = d.Category.Description;

            // here we were setting the values in the receipt side (Left one)
            //$("#personFirstName").text(personFirstName);
            //$("#personLastName").text(personLastName);
            //$("#paymentMethod").text(paymentMethod);
            //$("#personAddress").html(address);
            //$("#receiptAmount").html(amount);
            // Receipt.GetAllSavedTemplates();
            //console.log('set the values for merge fields ');
            Receipt.GetAllSavedTemplates();
        } else {
            commonTemplate.OnError();
        }
    },
    GetAllSavedTemplates: function () {
        var data = [];
        data.push({ 'name': 'categoryId', 'value': $("#hiddenCategoryId").val() });
        loader.showloader()
        ajaxrepository.callService('/Receipt/GetAllEmailTemplatesForCategory', data, Receipt.onSuccessGetAllEmailTemplatesForCategory, commonTemplate.onError, undefined);
    },
    onSuccessGetAllEmailTemplatesForCategory: function (d, s, e) {

        $("#contentContainer").css('background', '').css('background-repeat', '').css('background-size', '');
        //display background for letter only
        var backGroundImagePath = "";

        loader.hideloader();
        if (s == 'success') {
            if (d != -1) {
                var defaultTemplate = "";
                var optionForTemplates = "";
                templateList = d;
                for (var ctr = 0; ctr < d.length; ctr++) {

                    if (d[ctr].IsDefault) {
                        defaultTemplate = d[ctr];
                        optionForTemplates += "<option value='" + d[ctr].TemplateId + "' selected>" + d[ctr].TemplateName + " (Default)" + "</option>"
                    } else {
                        optionForTemplates += "<option value='" + d[ctr].TemplateId + "'>" + d[ctr].TemplateName + "</option>"
                    }
                }
                if (templateList.length == 0) {
                    optionForTemplates += "<option value=''>-Template-</option>"
                }
                if (defaultTemplate == "" && d.length > 0) {
                    defaultTemplate = d[0];
                }
                //console.log(optionForTemplates);
                $("#ddlTemplate").html(optionForTemplates);
                $("#ddlTemplate").html(optionForTemplates).change();
                //$("#templateType").html(optionForTemplates);

                //console.log(defaultTemplate);

                if (defaultTemplate != "") {
                    templateAttachmentPath = defaultTemplate.TemplateFilesPath;
                    var txt = "<table>"; var txt1 = "<table>";
                    if (defaultTemplate.AttachmentFileName.length > 0) {
                        var templateAttachements = defaultTemplate.AttachmentFileName;

                        $.each(templateAttachements, function (index, value) {
                            defaultTemplateAttachments.push(value);
                            txt += "<tr><td><a href='" + templateAttachmentPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td><td><i class='btn fa fa-trash' style='color:red;font-size:25px;' data-file='" + value.AttachmentGuid + "'></i></td></tr>";
                            txt1 += "<tr><td><a href='" + templateAttachmentPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td></tr>";
                        });
                    }
                    txt += "</table>"; txt1 += "</table>";
                    document.getElementById("fileAttachmentPreviewNames").innerHTML = "ExistingAttachments:<br>" + txt1;
                    document.getElementById("fileAttachmentReportNames").innerHTML = txt;
                    if (defaultTemplate.BackgroundFile != null) {
                        $("#hdnBackgroundImage").val(defaultTemplate.TemplateFilesPath + defaultTemplate.BackgroundFile);
                        var backGroundImagePath = location.origin + defaultTemplate.TemplateFilesPath + defaultTemplate.BackgroundFile;
                        $("#contentContainer").css('background', 'url("' + backGroundImagePath + '")').css('background-repeat', 'no-repeat').css('background-size', '100% 100%');
                    }
                    else {
                        $("#hdnBackgroundImage").val('');
                    }

                    if (defaultTemplate.Attachment != null && defaultTemplate.Attachment != "") {
                        $("#hdnAttachments").val(defaultTemplate.Attachment);
                    } else {
                        $("#hdnAttachments").val("");
                    }

                    //console.log(defaultTemplate);
                    defaultTemplate.EmailSubject = Receipt.ReplaceMergeFields(defaultTemplate.EmailSubject);
                    $("#txtEmailSubjectReportPreview").val(defaultTemplate.EmailSubject);

                    //console.log(defaultTemplate.EmailBody)
                    //console.log(defaultTemplate.EmailBody)
                    var emailBody = CKEDITOR.instances.editor1.getData();

                    emailBody = Receipt.ReplaceMergeFieldsWithHtml(defaultTemplate.EmailBody);
                    //CKEDITOR.instances['ckEmailBody'].setData(Receipt.ReplaceMergeFields(defaultTemplate.EmailBody));
                    //CKEDITOR.instances['ckEmailBody'].setData(Receipt.ReplaceMergeFields(emailBody));
                    var statementHeader = Receipt.ReplaceMergeFieldsWithHtml(defaultTemplate.StatementHeader);
                    var statementText = Receipt.ReplaceMergeFieldsWithHtml(defaultTemplate.StatementText);
                    var statementFooter = Receipt.ReplaceMergeFieldsWithHtml(defaultTemplate.StatementFooter);
                    $("#statementHeader").html(Receipt.ReplaceMergeFields(statementHeader));
                    $("#statementBody").html(Receipt.ReplaceMergeFields(statementText));
                    $("#statementFooter").html(Receipt.ReplaceMergeFields(statementFooter));
                    $("#ckEmailBodyPreview").html(Receipt.ReplaceMergeFields(emailBody));

                    //var ListofItemsDragged_1 = document.getElementById('statementHeader').getElementsByTagName("p");
                    //commonTemplate.setClassToMergeFields(ListofItemsDragged_1);

                    //var ListofItemsDragged_2 = document.getElementById('statementBody').getElementsByTagName("p");
                    //commonTemplate.setClassToMergeFields(ListofItemsDragged_2);

                    //var ListofItemsDragged_3 = document.getElementById('statementFooter').getElementsByTagName("p");
                    //commonTemplate.setClassToMergeFields(ListofItemsDragged_3);

                    //var ListofItemsDragged_4 = document.getElementById('ckEmailBodyPreview').getElementsByTagName("p");
                    //commonTemplate.setClassToMergeFields(ListofItemsDragged_4);

                    //var ListofItemsDragged_5 = document.getElementById('txtEmailSubjectReportPreview').getElementsByTagName("p");
                    //commonTemplate.setClassToMergeFields(ListofItemsDragged_5);

                }
                if (templateList.length == 0 || defaultTemplate == "") {
                    $("#hdnBackgroundImage").val("");
                    var z = '<label class="myFile form-group">' +
                        '<i class="fa fa-upload" style="font-size:25px;">&nbsp; </i><span id="bgFilePlaceHolder">Choose background</span>' +
                        '<input id="statementBgFile" type="file" onchange="commonTemplate.getAddedBgFileName()" multiple />' +
                        '</label>'
                    $("#bgFileUploadDiv").append(z);
                    $("#attachmentPlaceHolder").text('Choose attachment');
                    $("#hdnAttachments").val("");
                    $("#hdnAttachmentsPath").val("");
                    $("#hdnBackgroundImage").val('');
                }
                $("#attachemtnSelectedFileDiv").children().remove();
            }

        }
    },
}
var commonTemplate = {
    init: function () {

        //Receipt_Report, Statement_Reprot, Statement_Report_Preview, Job is a Page Heading
        if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {

            $(document).on('show.bs.modal', '.modal', function () {
                $(this).data('bs.modal')._config.backdrop = 'static';
                $('.modal-dialog').draggable({
                    handle: ".modal-header"
                });
                $('.app-header *').css({ 'pointer-events': 'none' });
            });

            $(document).on('hidden.bs.modal', '.modal', function (e) {
                if ($(".modal:visible").length == 0) {
                    $('.app-header *').css({ 'pointer-events': 'all' });
                }
            });
            if ($("#ViewId").val() != "Statement_Report_Preview") {
                $("#btnPrintStatementAll").addClass("d-none");
                $("#btnEmailStatementAll").addClass("d-none");
                $("#btnPrintStatement").removeClass("d-none");
                $("#btnEmailStatement").removeClass("d-none");
            } else {
                $("#btnPrintStatementAll").removeClass("d-none");
                $("#btnEmailStatementAll").removeClass("d-none");
                $("#btnPrintStatement").addClass("d-none");
                $("#btnEmailStatement").addClass("d-none");
            }

            objPeopleFilterVmForStatement = localStorage.getItem('objPeopleFilterVmForStatement');
            if (objPeopleFilterVmForStatement != null) {
                objPeopleFilterVmForStatement = JSON.parse(objPeopleFilterVmForStatement)
                if (objPeopleFilterVmForStatement.hasNoEmailSetup == true) {
                    PrintReport.casePrintOnly();
                }
            }
            PrintReport.GetStatementFormats();
            PrintReport.GetAllSavedTemplates();
            $("#btnDesign").parent().removeClass("active");
            $("#btnPreview").parent().addClass("active");
            commonTemplate.PreviewModeInTemplateSystem();
            if ($("#ViewId").val() == 'Statement_Reprot')
                commonTemplate.SetDataInPreviewDivs();
            commonTemplate.getPeopleDetailForStatementPreview();
            commonTemplate.BindCkeditor();
            commonTemplate.BindCkEditorWithConfig();
            $("#btnPrintStatement").click(function () {
                isAdditionalText1AlreadyReplaced = true;
                $("#btnAdditionalText1").click();
                isAdditionalText2AlreadyReplaced = true;
                $("#btnAdditionalText2").click();
                commonTemplate.PrintDiv();
            });
            $("#btnPrintStatementAll").click(function () {
                debugger;
                PrintReport.getMultipleStatement();
            });
            $("#btnEmailStatementAll").click(function () {
                isAdditionalText1AlreadyReplaced = true;
                $("#btnAdditionalText1").click();
                isAdditionalText2AlreadyReplaced = true;
                $("#btnAdditionalText2").click();
                PrintReport.EmailStatementToAll();
            });
            $("#btnEmailStatement").click(function () {
                isAdditionalText1AlreadyReplaced = true;
                $("#btnAdditionalText1").click();
                isAdditionalText2AlreadyReplaced = true;
                $("#btnAdditionalText2").click();
                commonTemplate.SendEmail();
            });

            $("#btnOk").click(function () {
                commonTemplate.SetDataInPreviewDivs();
            });

            //$("#BtnPreviewWindow").click(function () {
            //    commonTemplate.PreviewModeInTemplateSystem();
            //});
            //$("#btnSaveTemplate").click(function () {

            //    commonTemplate.SaveTemplate();
            //});
            $("#btnSetTemplateDefault").click(function () {

                commonTemplate.SetTemplateDefault();

            });
            if ($("#isDesignPermitted").val() == 1) {
                $("#BtnDesignWindow").removeClass('d-none');
                $("#BtnPreviewWindow").removeClass('d-none');
                // $("#btnDeleteTemplate").show();
                //$('#btnDeleteTemplate').removeClass('d-none');

            }
            else {
                $('#BtnDesignWindow').removeClass('active');
                $("#BtnDesignWindow").addClass('d-none');
                $("#BtnPreviewWindow").addClass('d-none');
            }

        }
        else if ($("#ViewId").val() == "Job") {
            //$("#btnSaveTemplate").click(function () {

            //    commonTemplate.SaveTemplate();
            //});
            $("#btnSetTemplateDefault").click(function () {

                commonTemplate.SetTemplateDefault();

            })
        }
        else if ($("#ViewId").val() == "Receipt_Report" && $("#ViewId").val() != "Job") {
            $(document).on('show.bs.modal', '.modal', function () {
                $(this).data('bs.modal')._config.backdrop = 'static';
                $('.modal-dialog').draggable({
                    handle: ".modal-header"
                });

            });
            $(document).on('hidden.bs.modal', '.modal', function (e) {
                if ($(".modal:visible").length == 0) {

                }
            });
            Receipt.GetAllDefaultReceiptFormats();
            Receipt.GetAllSavedTemplates();
            $("#btnDesign").parent().removeClass("active");
            $("#btnPreview").parent().addClass("active");
            commonTemplate.PreviewModeInTemplateSystem();
            commonTemplate.BindCkeditor();
            commonTemplate.BindCkEditorWithConfig();

            //$("#btnSaveTemplate").click(function () {
            //    commonTemplate.SaveTemplate();
            //});
            $("#btnSetTemplateDefault").click(function () {
                commonTemplate.SetTemplateDefault();
            });

            $("#btnPrintStatement").click(function () {
                isAdditionalText1AlreadyReplaced = true;
                $("#btnAdditionalText1").click();
                isAdditionalText2AlreadyReplaced = true;
                $("#btnAdditionalText2").click();
                commonTemplate.PrintDiv();
            });
            $("#btnEmailStatement").click(function () {
                isAdditionalText1AlreadyReplaced = true;
                $("#btnAdditionalText1").click();
                isAdditionalText2AlreadyReplaced = true;
                $("#btnAdditionalText2").click();
                commonTemplate.SendEmail();
            });
            if ($("#isDesignPermitted").val() == 1) {
                $("#BtnDesignWindow").removeClass('d-none');
                $("#BtnPreviewWindow").removeClass('d-none');
                // $("#btnDeleteTemplate").show();
                //$('#btnDeleteTemplate').removeClass('d-none');
            }
            else {
                $('#BtnDesignWindow').removeClass('active');
                $("#BtnDesignWindow").addClass('d-none');
                $("#BtnPreviewWindow").addClass('d-none');
            }
        }
        $("#BtnDesignWindow").click(function () {
            commonTemplate.DesignModeInTemplateSystem();
        });
        $("#ddlTemplate").change(function () {
            //$("#BtnDesignWindow").removeClass('disable');  
            //$("#BtnDesignWindow").removeClass('d-none');     

            $("#btnDeleteTemplate").show();
            commonTemplate.TemplateTypeChange();
        });
        $("#BtnPreviewWindow").click(function () {
            commonTemplate.PreviewModeInTemplateSystem();
        });

        $("#statementSettingModalCancel").click(function () {
            $("#ddlTemplate").prop('disabled', false);
            commonTemplate.TemplateTypeChange();
        });

        $("#fileAttachmentReportNames").on("click", "i", function (event) {
            var file_name = $(this).attr('data-file');

            var filtered = defaultTemplateAttachments.filter(function (el) { return el.AttachmentGuid != file_name; });
            defaultTemplateAttachments = Array.from(filtered);

            var txt = "<table>"; var txt1 = "<table>";

            $.each(defaultTemplateAttachments, function (index, value) {
                txt += "<tr><td><a href='" + TemplateFilesPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td><td><i class='btn fa fa-trash' style='color:red;font-size:25px;' data-file='" + value.AttachmentGuid + "'></i></td></tr>";
                txt1 += "<tr><td><a href='" + TemplateFilesPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td></tr>";
            });

            txt += "</table>"; txt1 += "</table>";
            document.getElementById("fileAttachmentReportNames").innerHTML = txt;
            document.getElementById("fileAttachmentPreviewNames").innerHTML = "ExistingAttachments:<br>" + txt1;
        });


        $("#btnOk").click(function () {
            commonTemplate.SetDataInPreviewDivs();
        });

        //$("#btnSetTemplateDefault").click(function () {
        //    commonTemplate.SetTemplateDefault();
        //});

        $("#btnEmailStatement").click(function () {
            isAdditionalText1AlreadyReplaced = true;
            $("#btnAdditionalText1").click();
            isAdditionalText2AlreadyReplaced = true;
            $("#btnAdditionalText2").click();
            commonTemplate.SendEmail();
        });
        $("#btnSaveTemplate").click(function () {
            btnTemplateSaveClicked = false;
            commonTemplate.SaveTemplate();
        });
        $("#btntemplateSave").click(function () {
            btnTemplateSaveClicked = true;
            commonTemplate.SaveTemplate();
        });
        $("#btnAdditionalText1").click(function () {
            //   if ($("#AdditionalText1").val() != null && $("#AdditionalText1").val() != '') {
            var statementHeader = CKEDITOR.instances.txtStatementHeader.getData();
            var statementBody = CKEDITOR.instances.ckStatementBody.getData();
            var statementFooter = CKEDITOR.instances.txtStatementFooter.getData();
            var subject = $("#txtEmailSubject").val();
            var emailBody = CKEDITOR.instances.editor1.getData();
            if ($("#ViewId").val() != "Job") {
                if ($("#ViewId").val() == "Receipt_Report") {
                    // replacing the merge fields for ReceiptFormat with html for them
                    statementHeader = Receipt.ReplaceMergeFieldsWithHtml(statementHeader);
                    statementBody = Receipt.ReplaceMergeFieldsWithHtml(statementBody);
                    statementFooter = Receipt.ReplaceMergeFieldsWithHtml(statementFooter);
                    subject = Receipt.ReplaceMergeFieldsWithHtml(subject);
                    emailBody = Receipt.ReplaceMergeFieldsWithHtml(emailBody);

                    statementHeader = Receipt.ReplaceMergeFields(statementHeader);
                    statementBody = Receipt.ReplaceMergeFields(statementBody);
                    statementFooter = Receipt.ReplaceMergeFields(statementFooter);
                    subject = Receipt.ReplaceMergeFields(subject);
                    emailBody = Receipt.ReplaceMergeFields(emailBody);
                    $("#statementHeader").html(statementHeader);
                    $("#statementBody").html(statementBody);
                    $("#statementFooter").html(statementFooter);
                    $("#ckEmailBodyPreview").html(emailBody);
                    $("#txtEmailSubjectReportPreview").val(subject);
                }
                else if ($("#ViewId").val() != "Receipt_Report") {
                    statementHeader = PrintReport.ReplaceMergeFields(statementHeader);
                    statementBody = PrintReport.ReplaceMergeFields(statementBody);
                    statementFooter = PrintReport.ReplaceMergeFields(statementFooter);
                    subject = PrintReport.ReplaceMergeFields(subject);
                    emailBody = PrintReport.ReplaceMergeFields(emailBody);
                    $("#statementHeader").html(statementHeader);
                    $("#statementBody").html(statementBody);
                    $("#statementFooter").html(statementFooter);
                    $("#ckEmailBodyPreview").html(emailBody);
                    $("#txtEmailSubjectReportPreview").val(subject);
                }


                statementHeader = commonTemplate.ReplaceAdditionalTextMergeField('statementHeader');
                $("#statementHeader").html(statementHeader);

                statementBody = commonTemplate.ReplaceAdditionalTextMergeField('statementBody');
                $("#statementBody").html(statementBody);

                statementFooter = commonTemplate.ReplaceAdditionalTextMergeField('statementFooter');
                $("#statementFooter").html(statementFooter);
                statementHeader = commonTemplate.ReplaceAdditionalTextMergeField('statementHeaderReport');
                $("#statementHeaderReport").html(statementHeader);

                $("#statementBodyReport").css({ 'text-align': '' });

                statementBody = commonTemplate.ReplaceAdditionalTextMergeField('statementBodyReport');
                $("#statementBodyReport").html(statementBody);

                statementFooter = commonTemplate.ReplaceAdditionalTextMergeField('statementFooterReport');
                $("#statementFooterReport").html(statementFooter);

                if (subject.indexOf('[AdditionalText1]') != -1) {
                    if ($("#AdditionalText1").val() != "") {
                        subject = subject.replace(/\[AdditionalText1\]/g, $("#AdditionalText1").val());
                    }
                }
                if (subject.indexOf('[AdditionalText2]') != -1) {
                    if ($("#AdditionalText2").val() != "") {
                        subject = subject.replace(/\[AdditionalText2\]/g, $("#AdditionalText2").val());
                    }
                }
                $("#txtEmailSubjectReportPreview").val(subject);

                emailBody = commonTemplate.ReplaceAdditionalTextMergeField('ckEmailBodyPreview');
                $("#ckEmailBodyPreview").html(emailBody);
            } else {
                Job.PreviewModeInJob();
            }

            //    }
        });
        $("#btnAdditionalText2").click(function () {
            //    if ($("#AdditionalText2") != null && $("#AdditionalText2").val() != '') {
            var statementHeader = CKEDITOR.instances.txtStatementHeader.getData();
            var statementBody = CKEDITOR.instances.ckStatementBody.getData();
            var statementFooter = CKEDITOR.instances.txtStatementFooter.getData();
            var subject = $("#txtEmailSubject").val();
            var emailBody = CKEDITOR.instances.editor1.getData();
            if ($("#ViewId").val() != "Job") {
                if ($("#ViewId").val() == "Receipt_Report") {
                    // replacing the merge fields for ReceiptFormat with html for them
                    statementHeader = Receipt.ReplaceMergeFieldsWithHtml(statementHeader);
                    statementBody = Receipt.ReplaceMergeFieldsWithHtml(statementBody);
                    statementFooter = Receipt.ReplaceMergeFieldsWithHtml(statementFooter);
                    subject = Receipt.ReplaceMergeFieldsWithHtml(subject);
                    emailBody = Receipt.ReplaceMergeFieldsWithHtml(emailBody);

                    statementHeader = Receipt.ReplaceMergeFields(statementHeader);
                    statementBody = Receipt.ReplaceMergeFields(statementBody);
                    statementFooter = Receipt.ReplaceMergeFields(statementFooter);
                    subject = Receipt.ReplaceMergeFields(subject);
                    emailBody = Receipt.ReplaceMergeFields(emailBody);
                    $("#statementHeader").html(statementHeader);
                    $("#statementBody").html(statementBody);
                    $("#statementFooter").html(statementFooter);
                    $("#ckEmailBodyPreview").html(emailBody);
                    $("#txtEmailSubjectReportPreview").val(subject);
                }
                else if ($("#ViewId").val() != "Receipt_Report") {
                    statementHeader = PrintReport.ReplaceMergeFields(statementHeader);
                    statementBody = PrintReport.ReplaceMergeFields(statementBody);
                    statementFooter = PrintReport.ReplaceMergeFields(statementFooter);
                    subject = PrintReport.ReplaceMergeFields(subject);
                    emailBody = PrintReport.ReplaceMergeFields(emailBody);
                    $("#statementHeader").html(statementHeader);
                    $("#statementBody").html(statementBody);
                    $("#statementFooter").html(statementFooter);
                    $("#ckEmailBodyPreview").html(emailBody);
                    $("#txtEmailSubjectReportPreview").val(subject);
                }


                statementHeader = commonTemplate.ReplaceAdditionalTextMergeField('statementHeader');
                $("#statementHeader").html(statementHeader);

                statementBody = commonTemplate.ReplaceAdditionalTextMergeField('statementBody');
                $("#statementBody").html(statementBody);

                statementFooter = commonTemplate.ReplaceAdditionalTextMergeField('statementFooter');
                $("#statementFooter").html(statementFooter);
                statementHeader = commonTemplate.ReplaceAdditionalTextMergeField('statementHeaderReport');
                $("#statementHeaderReport").html(statementHeader);

                $("#statementBodyReport").css({ 'text-align': '' });

                statementBody = commonTemplate.ReplaceAdditionalTextMergeField('statementBodyReport');
                $("#statementBodyReport").html(statementBody);

                statementFooter = commonTemplate.ReplaceAdditionalTextMergeField('statementFooterReport');
                $("#statementFooterReport").html(statementFooter);
                if (subject.indexOf('[AdditionalText1]') != -1) {
                    if ($("#AdditionalText1").val() != "") {
                        subject = subject.replace(/\[AdditionalText1\]/g, $("#AdditionalText1").val());
                    }
                }
                if (subject.indexOf('[AdditionalText2]') != -1) {
                    if ($("#AdditionalText2").val() != "") {
                        subject = subject.replace(/\[AdditionalText2\]/g, $("#AdditionalText2").val());
                    }
                }
                $("#txtEmailSubjectReportPreview").val(subject);
                emailBody = commonTemplate.ReplaceAdditionalTextMergeField('ckEmailBodyPreview');
                $("#ckEmailBodyPreview").html(emailBody);
            } else {
                Job.PreviewModeInJob();
                //      }   
            }
        });
        $("#AdditionalText1").on("keyup", function (event) {
            if (event.keyCode == 13) {
                $("#btnAdditionalText1").click();
            }
        });
        $("#AdditionalText2").on('keyup', function (event) {
            if (event.keyCode == 13) {
                $("#btnAdditionalText2").click();
            }
        });
        $("#AdditionalText1").on("keyup", function (event) {
            if (event.keyCode == 8) {
                $("#btnAdditionalText1").click();
                //  isAdditionalText1AlreadyReplaced = false;
            }
        });
        $("#AdditionalText2").on('keyup', function (event) {
            if (event.keyCode == 8) {
                $("#btnAdditionalText2").click();
                // isAdditionalText2AlreadyReplaced = false;
            }
        });
        $("#txtEmailSubject").on('keyup', function () {
            $("#ddlTemplate").prop("disabled", true);
        });

        commonTemplate.browserTabClose();

    },
    browserTabClose: function () {
        $(window).bind("beforeunload", function (e) {
            debugger;
            var isDisabled = $('#ddlTemplate').prop('disabled');
            if (isDisabled) {
                Swal.fire({
                    title: 'Changes made in Template may not be saved!',
                    text: "",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    //cancelButtonColor: '#3085d6',
                    confirmButtonText: `Go To Save Template`,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        commonTemplate.SaveTemplate();
                    }
                    else {

                    }
                });
                return 'Are you sure you want to leave?';
            }
        });
    },
    TemplateTypeChange: function () {
        arrayFileName = [];
        ExistingBgImg = "";
        var defaultTemplate = "";
        $("#attachemtnSelectedFileDiv").children().remove();
        var selectedTemplateId = $("#ddlTemplate").val();
        $("#ddlTemplate").val(selectedTemplateId);
        $("#bgFilePreview").children().remove();
        $("#attachmentPreview").children().remove();
        $("#bgFileUploadDiv").children().remove();
        $("#selectedBackground").children().remove();
        $("#fileAttachment1").children().remove();
        $("#bgFilePreview").html('');
        $("#attachmentPreview").html('');
        $("#bgFileUploadDiv").html('');
        $("#selectedBackground").html('');
        $("#fileAttachment1").html('');
        $("#contentContainer").css('background', '').css('background-repeat', '').css('background-size', '');
        $("#statementHeader").html('');
        $("#statementBody").html('');
        $("#statementFooter").html('');
        $("#ckEmailBodyPreview").html('');
        $("#txtEmailSubjectReportPreview").val('');
        $("#statementHeaderReport").html('');
        $("#statementBodyReport").html('');
        $("#statementFooterReport").html('');
        $("#ckEmailBodyPreview").html('');
        $("#txtEmailSubjectReportPreview").val('');
        document.getElementById("fileAttachmentPreviewNames").innerHTML = "";
        for (var i = 0; i < templateList.length; i++) {
            // if a template with template id is found then fill the data of that template in their respective columns
            if (templateList[i].TemplateId == selectedTemplateId) {
                //$("#templateType").html(optionForTemplates);
                if (defaultTemplate == "") {
                    defaultTemplate = templateList[i];
                }

                $("#txtEmailSubject").val(templateList[i].EmailSubject);

                CKEDITOR.instances['editor1'].setData(templateList[i].EmailBody, {
                    callback: function () {
                        $("#ddlTemplate").prop('disabled', false);
                    }
                });
                CKEDITOR.instances['ckStatementBody'].setData(templateList[i].StatementText, {
                    callback: function () {
                        $("#ddlTemplate").prop('disabled', false);
                    }
                });
                CKEDITOR.instances['txtStatementHeader'].setData(templateList[i].StatementHeader, {
                    callback: function () {
                        $("#ddlTemplate").prop('disabled', false);
                    }
                });
                CKEDITOR.instances['txtStatementFooter'].setData(templateList[i].StatementFooter, {
                    callback: function () {
                        $("#ddlTemplate").prop('disabled', false);
                    }
                });

                templateName = templateList[i].TemplateName;
                var statementHeader = templateList[i].StatementHeader;
                var statementBody = templateList[i].StatementText;
                var statementFooter = templateList[i].StatementFooter;
                var subject = templateList[i].EmailSubject;
                var emailBody = templateList[i].EmailBody;
                if ($("#ViewId").val() != "Job") {
                    if ($("#ViewId").val() == "Receipt_Report") {
                        // replacing the merge fields for ReceiptFormat with html for them
                        statementHeader = Receipt.ReplaceMergeFieldsWithHtml(statementHeader);
                        statementBody = Receipt.ReplaceMergeFieldsWithHtml(statementBody);
                        statementFooter = Receipt.ReplaceMergeFieldsWithHtml(statementFooter);
                        subject = Receipt.ReplaceMergeFieldsWithHtml(subject);
                        emailBody = Receipt.ReplaceMergeFieldsWithHtml(emailBody);

                        statementHeader = Receipt.ReplaceMergeFields(statementHeader);
                        statementBody = Receipt.ReplaceMergeFields(statementBody);
                        statementFooter = Receipt.ReplaceMergeFields(statementFooter);
                        subject = Receipt.ReplaceMergeFields(subject);
                        emailBody = Receipt.ReplaceMergeFields(emailBody);
                    }
                    else if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {
                        statementHeader = PrintReport.ReplaceMergeFields(statementHeader);
                        statementBody = PrintReport.ReplaceMergeFields(statementBody);
                        statementFooter = PrintReport.ReplaceMergeFields(statementFooter);
                        subject = PrintReport.ReplaceMergeFields(subject);
                        emailBody = PrintReport.ReplaceMergeFields(emailBody);
                    }
                    $("#statementHeader").html(statementHeader);
                    $("#statementBody").html(statementBody);
                    $("#statementFooter").html(statementFooter);
                    $("#ckEmailBodyPreview").html(emailBody);
                    $("#txtEmailSubjectReportPreview").val(subject);
                    $("#statementHeaderReport").html(statementHeader);
                    $("#statementBodyReport").css({ 'text-align': '' });
                    $("#statementBodyReport").html(statementBody);
                    $("#statementFooterReport").html(statementFooter);
                    $("#ckEmailBodyPreview").html(emailBody);
                    $("#txtEmailSubjectReportPreview").val(subject);
                } else {
                    Job.PreviewModeInJob();
                }
                if (templateList[i].BackgroundFile != null && templateList[i].BackgroundFile != "") {
                    $("#bgFileUploadDiv").children().hide()

                    $("#hdnBackgroundImage").val(templateList[i].TemplateFilesPath + templateList[i].BackgroundFile);
                    //$("#bgFilePreview").append('<span class="my-2">Existing background</span><br>')
                    ExistingBgImg = templateList[i].BackgroundFile;
                    ExistingBgImgOriginalName = templateList[i].BackgroundImageOriginalName;
                    //var z = "<img src=" + templateList[i].TemplateFilesPath + "" + templateList[i].BackgroundFile + " style='height:100px;width:100px; object-fit:cover;' /><i class='btn btn-sm fa fa-edit text-info mx-2' id='EditBackground' onclick='StatementSettings.EditTemplateBackgroundImage();'  title='edit' datatoggle='tooltip' style='font-size: 25px;'></i><i class='btn btn-sm fa fa-trash text-danger' id='dltBackground' onclick='StatementSettings.DeleteTemplateBackgroundImage();'  title='delete' datatoggle='tooltip' style='font-size: 25px;'></i>";
                    var z = "<img id='bgFile' src=" + templateList[i].TemplateFilesPath + "" + templateList[i].BackgroundFile + " style='height:100px;width:100px;' />" +
                        "<label class='fa fa-edit text-info ml-4' title='edit' datatoggle='tooltip' style='font-size: 25px!important'><input type='file' class='input-file' name='file' id='statementBgFile' onchange='commonTemplate.getEditedBgFileName()' /></label >" +
                        "<i class='btn btn-sm fa fa-trash text-danger mb-3 ml-1' id='dltBackground' onclick='commonTemplate.DeleteTemplateBackgroundImage()' title='delete' datatoggle='tooltip' style='font-size: 25px;'></i>";
                    $("#bgFilePreview").append(z)
                    if (templateList[i].BackgroundImageOriginalName != null && templateList[i].BackgroundImageOriginalName != "")
                        $("#bgFilePreview").append('<br><span class="my-0">' + templateList[i].BackgroundImageOriginalName + '</span>')
                    //'< label class="fa fa-edit text-info" style = "font-size:25px!important" >< input type = "file" class="input-file" id = "statementBgFile" onchange = "changeText()" /> </label >'


                } else {
                    $("#hdnBackgroundImage").val("");
                    var z = '<label class="myFile form-group">' +
                        '<i class="fa fa-upload" style="font-size:25px;">&nbsp; </i><span id="bgFilePlaceHolder">Choose background</span>' +
                        '<input id="statementBgFile" type="file" onchange="commonTemplate.getAddedBgFileName()" multiple />' +
                        '</label>'
                    $("#bgFileUploadDiv").append(z);
                }

                if (templateList[i].AttachmentFileName.length > 0) {
                    arrayFileName = Array.from(templateList[i].AttachmentFileName);
                    TemplateFilesPath = templateList[i].TemplateFilesPath;

                    $("#attachmentPlaceHolder").text('Add attachment');

                    //$("#hdnAttachments").val(templateList[i].Attachment);
                    $("#hdnAttachmentsPath").val(TemplateFilesPath);
                    $("#attachmentPreview").append('<span class="my-2">Existing attachment</span><br>')
                    //arrayFileName = templateList[i].Attachment.split(',');
                    for (var i = 0; i < arrayFileName.length; i++) {
                        var z = '<i class="fas fa-file-pdf text-danger" ></i><a href="' + TemplateFilesPath + arrayFileName[i].AttachmentGuid + '" > ' + arrayFileName[i].OriginalName + '</a><i class="btn fa fa-trash text-danger"  onclick="commonTemplate.DeleteAttachment(arrayFileName[' + i + '].AttachmentGuid);" title="delete" datatoggle="tooltip" style="font-size: 25px;"></i><br>';
                        $("#attachmentPreview").append(z)
                    }
                } else {
                    $("#attachmentPlaceHolder").text('Choose attachment');
                    //$("#addFileDiv").hide();
                    //$("#attachmentDiv").show();
                    $("#hdnAttachments").val("");
                    $("#hdnAttachmentsPath").val("");
                }
                break;
            }
        }
        if (templateList.length == 0 || defaultTemplate == "") {
            $("#hdnBackgroundImage").val("");
            var z = '<label class="myFile form-group">' +
                '<i class="fa fa-upload" style="font-size:25px;">&nbsp; </i><span id="bgFilePlaceHolder">Choose background</span>' +
                '<input id="statementBgFile" type="file" onchange="commonTemplate.getAddedBgFileName()" multiple />' +
                '</label>'
            $("#bgFileUploadDiv").append(z);
            $("#attachmentPlaceHolder").text('Choose attachment');
            $("#hdnAttachments").val("");
            $("#hdnAttachmentsPath").val("");
            $("#hdnBackgroundImage").val("");
        }
        if (defaultTemplate != "") {
            templateAttachmentPath = defaultTemplate.TemplateFilesPath;
            var txt = "<table>";
            if (defaultTemplate.AttachmentFileName.length > 0) {
                var templateAttachements = defaultTemplate.AttachmentFileName;

                $.each(templateAttachements, function (index, value) {
                    defaultTemplateAttachments.push(value);
                    // txt += "<tr><td><a href='" + templateAttachmentPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td><td><i class='btn fa fa-trash' style='color:red;font-size:25px;' data-file='" + value.AttachmentGuid + "'></i></td></tr>";
                    txt += "<tr><td><a href='" + templateAttachmentPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td></tr>";
                });
            }
            txt += "</table>";
            document.getElementById("fileAttachmentPreviewNames").innerHTML = "ExistingAttachments:<br>" + txt;
            if (defaultTemplate.BackgroundFile != null) {
                $("#hdnBackgroundImage").val(defaultTemplate.TemplateFilesPath + defaultTemplate.BackgroundFile);
                var backGroundImagePath = location.origin + defaultTemplate.TemplateFilesPath + defaultTemplate.BackgroundFile;
                $("#contentContainer").css('background', 'url("' + backGroundImagePath + '")').css('background-repeat', 'no-repeat').css('background-size', '100% 100%');
            }

            if (defaultTemplate.Attachment != null && defaultTemplate.Attachment != "") {
                $("#hdnAttachments").val(defaultTemplate.Attachment);
            } else {
                $("#hdnAttachments").val("");
            }
        }


        $("#btnOk").click();


        setTimeout(function () {
            CKEDITOR.instances.editor1.on('change', function (e) {
                if (e.editor.checkDirty()) {
                    $("#ddlTemplate").prop('disabled', true);
                }

            });
            CKEDITOR.instances.ckStatementBody.on('change', function (e) {
                if (e.editor.checkDirty()) {
                    $("#ddlTemplate").prop('disabled', true);
                }
            });
        }, 1000);
    },
    getEditedBgFileName: function () {

        var fileUpload = $("#statementBgFile").get(0);
        selectedBgImage = fileUpload.files;
        //document.getElementById('bgFile').src = window.URL.createObjectURL(fileUpload.files[0])
        $("#bgFilePreview").children().remove();
        var a = window.URL.createObjectURL(fileUpload.files[0])
        var z = "<img id='bgFile' src=" + a + " style='height:100px;width:100px;' />" +
            "<label class='fa fa-edit text-info ml-4' title='edit' datatoggle='tooltip' style='font-size: 25px!important'><input type='file' class='input-file' name='file' id='statementBgFile' onchange='commonTemplate.getEditedBgFileName()' /></label >" +
            //"<i class='btn btn-sm fa fa-trash text-danger mb-3 ml-1' id='RemoveSelectedBg' onclick='StatementSettings.RemoveSelectedBg();' title='delete' datatoggle='tooltip' style='font-size: 25px;'></i>"+
            '<br><span class="my-0">' + fileUpload.files[0].name + '</span>'
        $("#bgFilePreview").append(z);
    },

    getAddedBgFileName: function () {

        var fileUpload = $("#statementBgFile").get(0);
        selectedBgImage = fileUpload.files;
        $("#bgFilePreview").children().remove();
        var a = window.URL.createObjectURL(fileUpload.files[0])
        var z = "<img id='bgFile' src=" + a + " style='height:100px;width:100px;' />" +
            '<br><span class="my-0">' + fileUpload.files[0].name + '</span>'
        $("#bgFilePreview").append(z)
    },
    getAttachmentFileName: function () {
        $("#attachemtnSelectedFileDiv").children().remove();
        var fileUpload = $("#fileAttachment1").get(0);
        selectedAttachments = fileUpload.files;
        if (fileUpload.files.length > 0) {
            for (var i = 0; i < fileUpload.files.length; i++) {
                //var z = '<span class="my-0">Selected Attachment</span><br>'+
                //    '<span class="my-0">' + fileUpload.files[0].name + '</span><br>'
                var z = '<span class="my-0">' + fileUpload.files[i].name + '</span><br>'
                $("#attachemtnSelectedFileDiv").append(z)
            }
        }
        //var a = window.URL.createObjectURL(fileUpload.files[0])
    },

    CheckForUnsavedTemplate: function () {
        var selectedTemplateId = $("#ddlTemplate").val();
        for (var i = 0; i < templateList.length; i++) {
            if (templateList[i].TemplateId == selectedTemplateId) {
                if (templateList[i].StatementHeader != CKEDITOR.instances.txtStatementHeader.getData()) { return true }
                if (templateList[i].StatementText != CKEDITOR.instances.ckStatementBody.getData()) { return true }
                if (templateList[i].StatementFooter != CKEDITOR.instances.txtStatementFooter.getData()) { return true }
                if (templateList[i].EmailSubject != $("#txtEmailSubject").val()) { return true }
                if (templateList[i].EmailBody != CKEDITOR.instances.editor1.getData()) { return true }
            }
        }
    },


    BindCkeditor: function () {

        var mergerField = [{
            name: '[Name]'
        },
        {
            name: '[Statement]'
        },
        {
            name: '[Category]'
        },
        {
            name: '[Balance]'
        },
        {
            name: '[Amount]'
        }
        ];

        CKEDITOR.disableAutoInline = true;
        // Implements a simple widget that represents contact details (see http://microformats.org/wiki/h-card).
        CKEDITOR.plugins.add('hcard', {
            requires: 'widget',

            init: function (editor) {

                //editor.widgets.add('hcard', {
                //    allowedContent: 'span(!h-card); a[href](!u-email,!p-name); span(!p-tel)',
                //    requiredContent: 'span(h-card)',
                //    pathName: 'hcard',

                //    upcast: function (el) {
                //        return el.name == 'span' && el.hasClass('h-card');
                //    }
                //});

                // This feature does not have a button, so it needs to be registered manually.
                editor.addFeature(editor.widgets.registered.hcard);

                // Handle dropping a contact by transforming the contact object into HTML.
                // Note: All pasted and dropped content is handled in one event - editor#paste.
                editor.on('paste', function (evt) {
                    var mergeField = evt.data.dataTransfer.getData('mergeField');
                    if (!mergeField) {
                        return;
                    }

                    evt.data.dataValue =
                        '<span class="h-card">' +
                        '<span class="p-name">' + mergeField.name + '</span>' +
                        '</span>';
                });
            }
        });

        CKEDITOR.on('instanceReady', function () {
            // When an item in the contact list is dragged, copy its data into the drag and drop data transfer.
            // This data is later read by the editor#paste listener in the hcard plugin defined above.
            CKEDITOR.document.getById('contactListOrganization').on('dragstart', function (evt) {
                // The target may be some element inside the draggable div (e.g. the image), so get the div.h-card.
                var target = evt.data.getTarget().getAscendant('div', true);

                // Initialization of the CKEditor data transfer facade is a necessary step to extend and unify native
                // browser capabilities. For instance, Internet Explorer does not support any other data type than 'text' and 'URL'.
                // Note: evt is an instance of CKEDITOR.dom.event, not a native event.
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);

                var dataTransfer = evt.data.dataTransfer;

                // Pass an object with contact details. Based on it, the editor#paste listener in the hcard plugin
                // will create the HTML code to be inserted into the editor. You could set 'text/html' here as well, but:
                // * It is a more elegant and logical solution that this logic is kept in the hcard plugin.
                // * You do not know now where the content will be dropped and the HTML to be inserted
                // might vary depending on the drop target.
                dataTransfer.setData('mergerField', mergerField[target.data('mergerField')]);

                // You need to set some normal data types to backup values for two reasons:
                // * In some browsers this is necessary to enable drag and drop into text in the editor.
                // * The content may be dropped in another place than the editor.
                dataTransfer.setData('text/html', target.getText());

                // You can still access and use the native dataTransfer - e.g. to set the drag image.
                // Note: IEs do not support this method... :(.
                //if (dataTransfer.$.setDragImage) {
                //    dataTransfer.$.setDragImage(target.findOne('img').$, 0, 0);
                //}
            });
            CKEDITOR.document.getById('contactListUser').on('dragstart', function (evt) {
                // The target may be some element inside the draggable div (e.g. the image), so get the div.h-card.
                var target = evt.data.getTarget().getAscendant('div', true);

                // Initialization of the CKEditor data transfer facade is a necessary step to extend and unify native
                // browser capabilities. For instance, Internet Explorer does not support any other data type than 'text' and 'URL'.
                // Note: evt is an instance of CKEDITOR.dom.event, not a native event.
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);

                var dataTransfer = evt.data.dataTransfer;

                // Pass an object with contact details. Based on it, the editor#paste listener in the hcard plugin
                // will create the HTML code to be inserted into the editor. You could set 'text/html' here as well, but:
                // * It is a more elegant and logical solution that this logic is kept in the hcard plugin.
                // * You do not know now where the content will be dropped and the HTML to be inserted
                // might vary depending on the drop target.
                dataTransfer.setData('mergerField', mergerField[target.data('mergerField')]);

                // You need to set some normal data types to backup values for two reasons:
                // * In some browsers this is necessary to enable drag and drop into text in the editor.
                // * The content may be dropped in another place than the editor.
                dataTransfer.setData('text/html', target.getText());

                // You can still access and use the native dataTransfer - e.g. to set the drag image.
                // Note: IEs do not support this method... :(.
                //if (dataTransfer.$.setDragImage) {
                //    dataTransfer.$.setDragImage(target.findOne('img').$, 0, 0);
                //}
            });

            CKEDITOR.document.getById('contactListCategory').on('dragstart', function (evt) {
                var target = evt.data.getTarget().getAscendant('div', true);
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                var dataTransfer = evt.data.dataTransfer;
                dataTransfer.setData('mergerField', mergerField[target.data('mergerField')]);
                dataTransfer.setData('text/html', target.getText());
            });
            CKEDITOR.document.getById('contactListPeople').on('dragstart', function (evt) {
                var target = evt.data.getTarget().getAscendant('div', true);
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                var dataTransfer = evt.data.dataTransfer;
                dataTransfer.setData('mergerField', mergerField[target.data('mergerField')]);
                dataTransfer.setData('text/html', target.getText());
            });
            CKEDITOR.document.getById('contactListGeneric').on('dragstart', function (evt) {
                var target = evt.data.getTarget().getAscendant('div', true);
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                var dataTransfer = evt.data.dataTransfer;
                dataTransfer.setData('mergerField', mergerField[target.data('mergerField')]);
                dataTransfer.setData('text/html', target.getText());
            });
            CKEDITOR.document.getById('contactListPeopleHebrew').on('dragstart', function (evt) {
                var target = evt.data.getTarget().getAscendant('div', true);
                CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
                var dataTransfer = evt.data.dataTransfer;
                dataTransfer.setData('mergerField', mergerField[target.data('mergerField')]);
                dataTransfer.setData('text/html', target.getText());
            });

        });
    },
    BindCkEditorWithConfig: function () {
        CKEDITOR.replace('editor1');
        //CKEDITOR.replace('txtStatementHeader', { height: 50 });
        CKEDITOR.replace('ckStatementBody', { height: 350 });
        CKEDITOR.replace('txtStatementFooter', {
            height: 50,
        });

        CKEDITOR.replace('txtStatementHeader', {
            height: 50,
        });
    },
    BindDragFunctionality: function () {

        document.querySelector('.myDragabble').addEventListener('dragstart', function (e) {

            e.dataTransfer.setData('text', e.target.innerHTML);
        });
    },
    onSuccessGetHeaderAndFooterForMail: function (d, s, e) {
        //console.log(d);
        $("#mailMessageTop").autocomplete({
            source: d.MailHeaders
        });

        $("#mailMessageBottom").autocomplete({
            source: d.MailFooters
        });
    },

    SaveTemplate: function () {
        var fileUpload = $("#statementBgFile").get(0);
        var attachment = $("#fileAttachment1").get(0);
        if (selectedBgImage != null) {
            var files = selectedBgImage;
        } else {
            //if (fileUpload != null)
            var files = fileUpload.files;
        }
        if (selectedAttachments != null) {
            var attachmentFiles = selectedAttachments

        } else {
            var attachmentFiles = attachment.files;
        }
        var emailStatementTemplateVm = {};
        var emailSubject = $("#txtEmailSubject").val();
        //var ExistingBgImg = $('#imgBgPreview').attr('src');
        //var emailSubject = CKEDITOR.instances.txtEmailSubject.getData();
        var emailBody = CKEDITOR.instances.editor1.getData();
        //var statementHeader = $("#txtStatementHeader").val();
        var statementHeader = CKEDITOR.instances.txtStatementHeader.getData();
        var statementBody = CKEDITOR.instances.ckStatementBody.getData();
        //var statementFooter = $("#txtStatementFooter").val();
        var statementFooter = CKEDITOR.instances.txtStatementFooter.getData();
        var TemplateId = $("#ddlTemplate").val()
        if (TemplateId == "" || TemplateId == null) {
            TemplateId = 0;
        }
        emailStatementTemplateVm.CategoryId = $("#hdnCategoryId").val();

        emailStatementTemplateVm.TemplateId = TemplateId;
        emailStatementTemplateVm.EmailSubject = emailSubject;
        emailStatementTemplateVm.EmailBody = emailBody;
        emailStatementTemplateVm.StatementText = statementBody;
        emailStatementTemplateVm.StatementHeader = statementHeader;
        emailStatementTemplateVm.StatementFooter = statementFooter;
        // please insert a check for atleat one field contains value

        /*
        let input = document.createElement("input");
        input.value = 'test';
        input.type = 'text';
        input.className = 'swal-content__input';
        */
        // Create FormData object  
        var statementTemplateFile = new FormData();
        if (files.length > 0) {
            statementTemplateFile.append("TemplateBgFile", files[0]);
        }
        if (attachmentFiles.length > 0) {
            for (var i = 0; i < attachmentFiles.length; i++) {
                statementTemplateFile.append("AttachmentFiles", attachmentFiles[i]);
            }
        }
        if (arrayFileName.length > 0) {
            var finalArray = arrayFileName.map(function (obj) {
                return obj.AttachmentGuid;
            });
            var strFileName = finalArray.join(',')
            statementTemplateFile.append("ExistingAttachment", $.trim(strFileName));
        }
        if ($("#ViewId").val() == "Receipt_Report" && $("#ViewId").val() != "Job") {
            statementTemplateFile.append("CategoryId", $("#hiddenCategoryId").val());
        } else if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {
            statementTemplateFile.append("CategoryId", $("#hdnCategoryId").val());
        }
        else if ($("#ViewId").val() == "Job") {
            statementTemplateFile.append("CategoryId", $("#hdnCategoryId").val());
        }
        statementTemplateFile.append("TemplateId", TemplateId);
        statementTemplateFile.append("EmailSubject", emailSubject);
        statementTemplateFile.append("EmailBody", emailBody);
        statementTemplateFile.append("StatementText", statementBody);
        statementTemplateFile.append("StatementHeader", statementHeader);
        statementTemplateFile.append("StatementFooter", statementFooter);
        statementTemplateFile.append("ExistingBgImg", ExistingBgImg);
        statementTemplateFile.append("BackgroundImageOriginalName", ExistingBgImgOriginalName);
        if (btnTemplateSaveClicked) {
            emailStatementTemplateVm.TemplateName = templateName;
            statementTemplateFile.append("TemplateName", templateName);
            commonTemplate.SaveEmailStatementtemplate(emailStatementTemplateVm, statementTemplateFile);
            btnTemplateSaveClicked = false;
        } else {
            Swal.fire({
                title: 'Enter Template Name',
                input: 'text',
                confirmButtonText: `Save`,
                confirmButtonColor: '#3f6ad8',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please Enter a Template Name!'
                    } else {
                        var optionlist = [];
                        $("#ddlTemplate option").each(function () {
                            if ($(this).text().toLowerCase().indexOf('(default)') == -1) {
                                optionlist.push($(this).text().toLowerCase().trim());
                            }
                            else {
                               var val = $(this).text().replace('(Default)', '');
                                optionlist.push(val.toLowerCase().trim());
                            }
                        });
                        if (optionlist.includes(value.toLowerCase().trim())) {
                            return 'Template Name already exists';
                        }
                    }
                }
            }).then((value) => { 
              
                emailStatementTemplateVm.TemplateName = value.value.trim();
                statementTemplateFile.append("TemplateName", emailStatementTemplateVm.TemplateName);
                //var data = "{emailStatementTemplateVm:" + JSON.stringify(emailStatementTemplateVm) + "}";
                commonTemplate.SaveEmailStatementtemplate(emailStatementTemplateVm, statementTemplateFile);
                //    break;
                //default:
                //    break;
                // }
            });
        }
    },
    SaveEmailStatementtemplate: function (emailStatementTemplateVm, statementTemplateFile) {
        debugger;
        if ($("#ViewId").val() == "Receipt_Report") {
            if (templateName == emailStatementTemplateVm.TemplateName) {
                //ajaxrepository.callServiceForPostAttachments('/Receipt/EditEmailStatementTemplate', statementTemplateFile, Receipt.onSuccessSaveEmailStatementTemplate, statementTemplateFile.onError, undefined);
                ajaxrepository.callServiceForPostAttachments('/Receipt/EditEmailStatementTemplate', statementTemplateFile, commonTemplate.onSuccessSaveEmailStatementTemplate, commonTemplate.onError, undefined);
            } else {
                ajaxrepository.callServiceForPostAttachments('/Receipt/SaveEmailStatementTemplate', statementTemplateFile, commonTemplate.onSuccessSaveEmailStatementTemplate, commonTemplate.onError, undefined);
            }
        }
        else if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {

            if (templateName == emailStatementTemplateVm.TemplateName) {
                ajaxrepository.callServiceForPostAttachments('/Account/EditEmailStatementTemplate', statementTemplateFile, commonTemplate.onSuccessSaveEmailStatementTemplate, commonTemplate.onError, undefined);
            } else {
                ajaxrepository.callServiceForPostAttachments('/Account/SaveEmailStatementTemplate', statementTemplateFile, commonTemplate.onSuccessSaveEmailStatementTemplate, commonTemplate.onError, undefined);
            }
        }
        else if ($("#ViewId").val() == "Job") {
            if (templateName == emailStatementTemplateVm.TemplateName) {
                ajaxrepository.callServiceForPostAttachments('/Job/EditEmailStatementTemplate', statementTemplateFile, commonTemplate.onSuccessSaveEmailStatementTemplate, commonTemplate.onError, undefined);
            } else {
                ajaxrepository.callServiceForPostAttachments('/Job/SaveEmailStatementTemplate', statementTemplateFile, commonTemplate.onSuccessSaveEmailStatementTemplate, commonTemplate.onError, undefined);
            }
        }

    },
    onSuccessSaveEmailStatementTemplate: function (d, s, e) {
        if (s == "success") {
            // console.log(d);
            // tamplate saved successfully in database
            if (d != -1) {
                //$("#attachmentPreview").children().remove();
                //for (var i = 0; i < arrayFileName.length; i++) {
                //    var z = "<i class='fas fa-file-pdf mr-2 fa-2x text-danger'></i><a href=" + TemplateFilesPath + arrayFileName[i] + " style='overflow-x: hidden;'>" + arrayFileName[i] + "</a><i class='btn fa fa-trash text-danger' onclick='StatementSettings.DeleteAttachment(arrayFileName[" + i + "]);'   title='delete' datatoggle='tooltip'></i><br>";
                //    $("#attachmentPreview").append(z)
                //}
                d = JSON.parse(d)
                //console.log(d);
                $("#ddlTemplate").append(`<option val=${d.id}>${d.name}</option>`)
                notifiy.notification('success', 'Template saved successfully!', 'success');
                $("#ddlTemplate").prop('disabled', false);
                if ($("#ViewId").val() == "Receipt_Report") {
                    //Receipt.GetAllDefaultReceiptFormats();
                    Receipt.GetAllSavedTemplates();

                }
                else if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {
                    // PrintReport.GetStatementFormats();
                    PrintReport.GetAllSavedTemplates();
                }
                else {
                    Job.GetAllSavedTemplates();
                }
                //$("#statementSettingModal").modal('hide');
                //$('#btnSaveTemplate').hide();
            } else if (d == -1) {
                notifiy.notification('danger', 'Something went wrong', 'danger');
            }
        }
    },
    SetTemplateDefault: function () {
        //alert("Hello Alert");
        //var templateIdForDefault = $("#templateType").val();
        //var categoryId = $("#hdnLedgerCategoryId").val();
        var templateDefaultVm = {};
        templateDefaultVm.TemplateId = $("#ddlTemplate").val();
        if ($("#ddlTemplate").val() != "") {
            if ($("#ViewId").val == "Receipt_Report") {
                templateDefaultVm.CategoryId = $("#hiddenCategoryId").val();
            }
            if ($("#ViewId").val != "Receipt_Report") {
                templateDefaultVm.CategoryId = $("#hdnCategoryId").val();
            }

            var data = "{templateDefaultVm:" + JSON.stringify(templateDefaultVm) + "}";
            ajaxrepository.callServiceWithPost('/Account/SetTemplateDefaultByTemplateIdAndCategoryId', data, commonTemplate.onSetTemplateDefaultSuccess, commonTemplate.onError, undefined);
        }
        else {
            notifiy.notification("info", "Please Select A template First", "Info");
        }
    },
    onSetTemplateDefaultSuccess: function (d, s, e) {
        if (s == "success") {
            if (d == 1) {
                notifiy.notification('success', "Selected template set as default", 'success');
                var selectedFormat = $("#ddlTemplate").val();
                $("#ddlTemplate option").each(function () {
                    if ($(this).val() == selectedFormat) {
                        $(this).text($(this).text().trim() + " (Default)")
                    } else {
                        $(this).text($(this).text().trim().replace("(Default)", "").trim());
                    }
                });
            } else if (d == -1) {
                notifiy.notification('danger', "Something went wrong", 'danger');
            }
        } else {
            notifiy.notification('danger', "Something went wrong", 'danger');
        }
    },
    DeleteTemplate: function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to Delete the Template?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, I'm Sure!`,
            allowEscapeKey: false,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                loader.showloader();

                var templateDefaultVm = {};
                templateDefaultVm.TemplateId = $("#ddlTemplate").val();
                if ($("#ddlTemplate").val() != "") {
                    if ($("#ViewId").val == "Receipt_Report") {
                        templateDefaultVm.CategoryId = $("#hiddenCategoryId").val();
                    }
                    if ($("#ViewId").val != "Receipt_Report") {
                        templateDefaultVm.CategoryId = $("#hdnCategoryId").val();
                    }

                    var data = "{templateDefaultVm:" + JSON.stringify(templateDefaultVm) + "}";
                    ajaxrepository.callServiceWithPost('/Account/DeleteTemplateByTemplateIdAndCategoryId', data, commonTemplate.onDeleteTemplateSuccess, commonTemplate.onError, undefined);
                }
                else {
                    notifiy.notification("info", "Please Select A template First", "Info");
                }
            }
        });
    },
    onDeleteTemplateSuccess: function (d, s, e) {
        if (s == "success") {
            if (d == 1) {
                notifiy.notification('success', "Selected template Deleted successfully", 'success');
                if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {
                    PrintReport.GetAllSavedTemplates();
                }
                else if ($("#ViewId").val() == "Job") {
                    Job.GetAllSavedTemplates();
                }
                else if ($("#ViewId").val() == "Receipt_Report" && $("#ViewId").val() != "Job") {
                    Receipt.GetAllSavedTemplates();
                }
            } else if (d == -1) {
                notifiy.notification('danger', "Something went wrong", 'danger');
            }
        } else {
            notifiy.notification('danger', "Something went wrong", 'danger');
        }
    },
    DeleteTemplateBackgroundImage: function () {
        var emailStatementTemplateVm = {};
        emailStatementTemplateVm.TemplateId = $("#ddlTemplate").val();
        //emailStatementTemplateVm.TemplateName = $("#templateType option:selected").text();
        emailStatementTemplateVm.TemplateName = templateName
        if ($("#ViewId").val() == "Receipt_Report") {
            emailStatementTemplateVm.CategoryId = $("#hiddenCategoryId").val();
        }
        else {
            emailStatementTemplateVm.CategoryId = $("#hdnCategoryId").val();
        }
        emailStatementTemplateVm.BackgroundFile = ExistingBgImg;
        var data = "{emailStatementTemplateVm:" + JSON.stringify(emailStatementTemplateVm) + "}";
        if ($("#ViewId").val() == "Receipt_Report") {
            ajaxrepository.callServiceWithPost('/Receipt/DeleteTemplateBackgroundImage', data, commonTemplate.onDeleteTemplateBackgroundImageSuccess, commonTemplate.onError, undefined);
        } else if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {
            ajaxrepository.callServiceWithPost('/Account/DeleteTemplateBackgroundImage', data, commonTemplate.onDeleteTemplateBackgroundImageSuccess, commonTemplate.onError, undefined);
        }
        else {
            ajaxrepository.callServiceWithPost('/Job/DeleteTemplateBackgroundImage', data, commonTemplate.onDeleteTemplateBackgroundImageSuccess, commonTemplate.onError, undefined);
        }
    },
    onDeleteTemplateBackgroundImageSuccess: function (d, s, e) {
        if (s == "success") {
            if (d == 1) {
                $("#hdnBackgroundImage").val("");
                $("#bgFilePreview").children().remove();
                var z = '<label class="myFile form-group">' +
                    '<i class="fa fa-upload" style="font-size:25px;">&nbsp; </i><span id="bgFilePlaceHolder">Choose background</span>' +
                    '<input id="statementBgFile" type="file" onchange="commonTemplate.getAddedBgFileName()" multiple />' +
                    '</label>'
                $("#bgFileUploadDiv").append(z);
                notifiy.notification('success', "Background image deleted successfully", 'success');

            } else if (d == -1) {
                notifiy.notification('danger', "Something went wrong", 'danger');
            }
        } else {
            notifiy.notification('danger', "Something went wrong", 'danger');
        }
    },
    DeleteAttachment: function (AttachmentName) {
        debugger
        var finalArray = arrayFileName.map(function (obj) {
            return obj.AttachmentGuid;
        });
        var filtered = arrayFileName.filter(function (el) { return el.AttachmentGuid != AttachmentName; });
        arrayFileName = Array.from(filtered);
        //var index = arrayFileName.indexOf(AttachmentName);
        //if (index > -1) {
        //    arrayFileName.splice(index, 1);
        //}
        var emailStatementTemplateVm = {};
        emailStatementTemplateVm.TemplateId = $("#ddlTemplate").val();
        //emailStatementTemplateVm.TemplateName = $("#templateType option:selected").text();

        emailStatementTemplateVm.TemplateName = templateName
        emailStatementTemplateVm.CategoryId = $("#hdnCategoryId").val();
        emailStatementTemplateVm.ExistingAttachment = $.trim(AttachmentName);
        var data = "{emailStatementTemplateVm:" + JSON.stringify(emailStatementTemplateVm) + "}";
        ajaxrepository.callServiceWithPost('/Account/DeleteAttachmentFiles', data, commonTemplate.onDeleteAttachmentSuccess, commonTemplate.onError, undefined);

    },
    onDeleteAttachmentSuccess: function (d, s, e) {

        $("#attachmentPreview").children().remove();
        if (s == "success") {
            if (d == 1) {
                for (var i = 0; i < arrayFileName.length; i++) {
                    var z = "<i class='fas fa-file-pdf mr-2 fa-2x text-danger'></i><a href=" + TemplateFilesPath + arrayFileName[i].AttachmentGuid + " style='overflow-x: hidden;'>" + arrayFileName[i].OriginalName + "</a><i class='btn fa fa-trash text-danger' onclick='commonTemplate.DeleteAttachment(arrayFileName[" + i + "].AttachmentGuid);'   title='delete' datatoggle='tooltip' style='font-size: 25px;'></i><br>";
                    $("#attachmentPreview").append(z)
                }

                notifiy.notification('success', "Attachment deleted successfully", 'success');

            } else if (d == -1) {
                notifiy.notification('danger', "Something went wrong", 'danger');
            }
        } else {
            notifiy.notification('danger', "Something went wrong", 'danger');
        }
    },
    EditTemplateBackgroundImage: function () {
        $("#bgFileUploadDiv").children().show();
    },
    DesignModeInTemplateSystem: function () {
        $('#DesignModeWindow').removeClass('d-none');
        $('#PreviewModeWindow').addClass('d-none');
        $("#btnsTemplateinReceipt").removeClass("d-none");
        $("#btnEmailStatementDiv").addClass("d-none");
        $("#btnPrintStatement").addClass("d-none");
        $("#btnEmailStatement").addClass("d-none");
        $("#btnEmailStatementAll").addClass("d-none");
        $("#btnPrintStatementAll").addClass("d-none");
        $("#btnPrintStatement").addClass("d-none");
        $("#btnEmailStatement").addClass("d-none");
        $("#personCounterPrint").addClass("d-none");
        $("#nextprevBtns").html('');
        $('#btnDeleteTemplate').removeClass('d-none');
        //$("#ddlTemplate").prop('disabled',true);
        //$("#btnSetTemplateDefault").addClass("d-none");
    },
    PreviewModeInTemplateSystem: function () {
        $("#btnOk").click();
        $('#PreviewModeWindow').removeClass('d-none');
        $('#DesignModeWindow').addClass('d-none');
        $("#btnsTemplateinReceipt").addClass("d-none");
        // $("#btnDeleteTemplate").hide();
        if (!($('#btnDeleteTemplate').hasClass('d-none'))) {

            $('#btnDeleteTemplate').addClass('d-none');
        }
        //$("#ddlTemplate").removeClass("d-none");
        //$("#btnSetTemplateDefault").removeClass("d-none"); 
        if ($("#ViewId").val() != "Statement_Report_Preview" && $("#ViewId").val() != "Job") {
            $("#btnEmailStatementDiv").removeClass("d-none");
            $("#btnPrintStatement").removeClass("d-none");
            $("#btnEmailStatement").removeClass("d-none");
            $("#btnEmailStatementAll").addClass("d-none");
            $("#btnPrintStatementAll").addClass("d-none");
            $("#btnmsg").addClass("d-none");
        }
        else if ($("#ViewId").val() == "Statement_Report_Preview") {
            $("#btnEmailStatementDiv").removeClass("d-none");
            $("#btnEmailStatementAll").removeClass("d-none");
            $("#btnPrintStatementAll").removeClass("d-none");
            $("#personCounterPrint").removeClass("d-none");
            $("#btnPrintStatement").addClass("d-none");
            $("#btnEmailStatement").addClass("d-none");
            $("#btnmsg").addClass("d-none");
            var nextBtn = '<div><ul style = "list-style: none; margin-bottom:0px" >' +
                '<li class="previous page-item" style=" float: left;" id="btnPrev" onclick="commonTemplate.PreviousPersonInfo()">' +
                '<a class="page-link"><i class="fa fa-angle-double-left"></i>Prev</a>' +
                '</li>' +
                '<li class="next page-item" style=" float: left;" id="btnNext" onclick="commonTemplate.NextPersonInfo()">' +
                '<a class="page-link">Next<i class="fa fa-angle-double-right"></i></a>' +
                '</li>'
            '</ul ></div >';
            $("#nextprevBtns").html(nextBtn);
            commonTemplate.getPeopleDetailForStatementPreview();

        }
        else if ($("#ViewId").val() == "Job") {
            //$('#PreviewModeWindow').removeClass('d-none');
            //$('#DesignModeWindow').addClass('d-none');
            $("#btnEmailStatementDiv").removeClass("d-none");
            $("#btnPrintStatement").addClass("d-none");
            $("#btnEmailStatement").addClass("d-none");
            $("#btnEmailStatementAll").addClass("d-none");
            $("#btnPrintStatementAll").addClass("d-none");
            $("#btnsTemplateinReceipt").addClass("d-none");
            $("#btnmsg").removeClass('d-none');
            var nextBtn = '<div><ul style = "list-style: none; margin-bottom:0px" >' +
                '<li class="previous page-item" style=" float: left;" id="btnPrev" onclick="Job.PreviousPersonInfo()">' +
                '<a class="page-link"><i class="fa fa-angle-double-left"></i> Prev</a>' +
                '</li>' +
                '<li class="next page-item" style=" float: left;" id="btnNext" onclick="Job.NextPersonInfo()">' +
                '<a class="page-link"> Next <i class="fa fa-angle-double-right"></i></a>' +
                '</li>'
            '</ul ></div >';
            $("#nextprevBtns").html(nextBtn);
            Job.PreviewModeInJob();
        }
    },
    getPeopleDetailForStatementPreview: function () {
        loader.showloader();
        var formData = new FormData();
        formData.append("objPeopleFilterVmForStatement", JSON.stringify(objPeopleFilterVmForStatement))
        ajaxrepository.callServiceForPostAttachments('/Functions/GetPeopleDetailForStatement', formData, commonTemplate.onGetPeopleDetailForStatementPreviewSuccess, commonTemplate.OnError, undefined);

    },
    onGetPeopleDetailForStatementPreviewSuccess: function (d, s, e) {
        loader.hideloader();
        if (s == 'success') {
            if (d != "" && d != null) {
                //console.log(data)
                var data = JSON.parse(d);
                AllPeopleList = data;
                console.log(AllPeopleList);
                //if(d.SelectedPersonId)
                // setting the details for merge fields              
                var currID = $("#hdnPersonIdforPreview").val();
                $.each(data, function (i, d) {
                    if (d.SelectedPersonId == currID) {
                        selectedPersonName = d.PersonName ?? "";
                        selectedCategoryDescription = d.CategoryDescription ?? "";
                        selectedCategory = d.Category ?? "";
                        selectedPersonCallName = d.CallName ?? "";

                        selectedPersonFirstName = d.PersonFirstName ?? "";
                        selectedPersonFirstNameH = d.PersonFirstNameH ?? "";
                        selectedPersonLastName = d.PersonLastName ?? "";
                        selectedPersonLastNameH = d.PersonLastNameH ?? "";
                        selectedPersonTitle = d.PersonTitle ?? "";
                        selectedPersonTitleH = d.PersonTitleH ?? "";
                        selectedPersonSuffixH = d.PersonSuffixH ?? "";
                        selectedPersonHebrewName = (selectedPersonTitleH != "" ? selectedPersonTitleH + " " : "") + (selectedPersonFirstNameH != "" ? selectedPersonFirstNameH + " " : "") + (selectedPersonLastNameH != "" ? selectedPersonLastNameH + " " : "") + (selectedPersonSuffixH != "" ? selectedPersonSuffixH + "" : "");

                        //selectedPersonHebrewName = d.PersonHebrewName ?? "";

                        selectedPersonAliya = d.Aliya ?? "";
                        selectedPersonTribe = d.Tribe ?? "";
                        selectedPersonTribeH = d.TribeH ?? "";
                        selectedPersonAliyaH = d.AliyaH ?? "";
                        selectedPersonCallNameH = d.CallNameH ?? ""
                        selectedPersonAnniversary = d.Anniversary ?? "";
                        selectedPersonAddress = d.Address ?? "";
                        if (d.PrintName != null && d.PrintName == true) {
                            // print the person name along with formatted address
                            selectedPersonFormattedAddress = d.HomeAddress != null ? `<span>${selectedPersonName}</span><br/>` + displayAddressFormat(d.HomeAddress) : "";
                        } else {
                            selectedPersonFormattedAddress = d.HomeAddress != null ? displayAddressFormat(d.HomeAddress) : "";
                        }

                        selectedPersonBusinessPhone = d.BusinessPhone != null ? d.BusinessPhone : "";
                        selectedPersonHomePhone = d.HomePhone != null ? d.HomePhone : "";
                        //FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                        FamilyOf = d.familyOfName != null ? d.familyOfName : "";
                        Anniversary = d.Anniversary != null ? common.ToJSDate(d.Anniversary) : "";
                        DOB = d.DOB != null ? common.ToJSDate(d.DOB) : "";
                        DeceasedDate = d.DeceasedDate != null ? common.ToJSDate(d.DeceasedDate) : "";
                        SSN = d.SSN != null ? d.SSN : "";
                        Married = d.Married != null ? d.Married : "";
                        Gender = d.Gender != null ? d.Gender : "";
                        selectedPersonEmail = d.selectedPersonEmail != null ? d.selectedPersonEmail : "";
                        //user
                        UserAddress = d.User.Address ?? "";
                        UserEmail = d.User.Email ?? "";
                        UserPhone = d.User.PhoneNo ?? "";
                        UserFirstName = d.User.FirstName ?? "";
                        UserLastName = d.User.LastName ?? "";
                        //organization
                        organizationName = d.Organization.Name ?? "";
                        organizationHebrewName = d.Organization.HebrewName ?? "";
                        organizationAddress = d.Organization.Address != null ? d.Organization.Address : "";
                        if (d.Organization.OrganizationLogoName != null && d.Organization.OrganizationLogoName != "") {

                            organizationLogo = `<img src="/Images/${d.Organization.OrganizationLogoName}" style="width:120px;" alt="Organization Logo"/>`// needs to be change with path
                        } else {
                            organizationLogo = "";
                        }
                        // father detail
                        selectedPersonFatherName = d.FatherName ?? "";
                        selectedPersonFatherFirstName = d.FatherFirstName ?? "";
                        selectedPersonFatherLastName = d.FatherLastName ?? "";
                        selectedPersonFatherFirstNameH = d.FatherFirstNameH ?? "";
                        selectedPersonFatherLastNameH = d.FatherLastNameH ?? "";
                        selectedPersonFatherTitle = d.FatherTitle ?? "";
                        selectedPersonFatherTitleH = d.FatherTitleH ?? "";
                        selectedPersonFatherSuffix = d.FatherSuffix ?? "";
                        selectedPersonFatherMiddleName = d.FatherMiddleName ?? "";
                        selectedPersonFatherCallName = d.FatherCallName ?? "";
                        selectedPersonFatherCallNameH = d.FatherCallNameH ?? "";
                        //selectedPersonFatherNameH = "" + selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + " " : "" + selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "" + selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "" + selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH : "" + "";
                        selectedPersonFatherNameH = (selectedPersonFatherTitleH != "" ? selectedPersonFatherTitleH + " " : "") + (selectedPersonFatherFirstNameH != "" ? selectedPersonFatherFirstNameH + " " : "") + (selectedPersonFatherLastNameH != "" ? selectedPersonFatherLastNameH + " " : "") + (selectedPersonFatherSuffix != "" ? selectedPersonFatherSuffix + "" : "");

                        // mother detail
                        selectedPersonMotherName = d.MotherName ?? "";
                        selectedPersonMotherFirstName = d.MotherFirstName ?? "";
                        selectedPersonMotherLastName = d.MotherLastName ?? "";
                        selectedPersonMotherFirstNameH = d.MotherFirstNameH ?? "";
                        selectedPersonMotherLastNameH = d.MotherLastNameH ?? "";
                        selectedPersonMotherTitle = d.MotherTitle ?? "";
                        selectedPersonMotherTitleH = d.MotherTitleH ?? "";
                        selectedPersonMotherSuffix = d.MotherSuffix ?? "";
                        selectedPersonMotherMiddleName = d.MotherMiddleName ?? "";
                        selectedPersonMotherCallName = d.MotherCallName ?? "";
                        selectedPersonMotherCallNameH = d.MotherCallNameH ?? "";
                        selectedPersonMotherNameH = (selectedPersonMotherTitleH != "" ? selectedPersonMotherTitleH + " " : "") + (selectedPersonMotherFirstNameH != "" ? selectedPersonMotherFirstNameH + " " : "") + (selectedPersonMotherLastNameH != "" ? selectedPersonMotherLastNameH + " " : "") + (selectedPersonMotherSuffix != "" ? selectedPersonMotherSuffix + "" : "");





                        //selectedPersonName = d.PersonName;
                        peopleCountEmailSetup = d.peopleCountEmailSetup
                        peopleCountNoEmailSetup = d.peopleCountNoEmailSetup
                        // selectedCategoryDescription = d.CategoryDescription;
                        var totalBill = 0;
                        var totalPaid = 0;
                        if (d.MasterLedgerVm.lstLedger.length > 0) {
                            //ledgerHtml = "<table class='table-bordered' style='width:100%;'><thead><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr><thead><tbody>";
                            ledgerHtml = "<table border='1' style='width:80%;border-collapse: collapse;margin: 0 auto;color: #212529;'><thead style='background-color: #3f51b5 !important;color: #fff !important;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                            ledgerHtml1 = "<table border='1' style='width:70%;border-collapse: collapse;margin: 0 auto;'><thead style='background-color: #4CAF50;color:white;'><tr class='text-center'><th>Date</th><th>Solicitor Code</th><th>Details</th><th>Bill</th><th>Paid</th><th>Adjustment</th><th>Balance</th><tr></thead><tbody>";
                            ledgerHtml += "<tr><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                            ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td></td><td></td><td>Previous Balance</td><td></td><td></td><td></td><td class='text-right' style='text-align:right'>" + d.MasterLedgerVm.Balance + "</td></tr>";
                            $.each(d.MasterLedgerVm.lstLedger, function (index, record) {
                                if (record.Bill > 0) {
                                    totalBill += record.Bill;
                                    ledgerHtml += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    if ((index + 1) % 2 == 0)
                                        ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    else
                                        ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td class='text-right' style='text-align:right'>" + record.Bill + "</td>" + "<td></td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                } else {
                                    totalPaid += record.Paid;
                                    ledgerHtml += "<tr><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    if ((index + 1) % 2 == 0)
                                        ledgerHtml1 += "<tr style='background-color:#f2f2f2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                    else
                                        ledgerHtml1 += "<tr style='background-color:#e2e2e2;'><td>" + common.ToJSDate(record.Date) + "</td>" + "<td>01</td>" + "<td>" + record.Description + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Paid + "</td>" + "<td></td>" + "<td class='text-right' style='text-align:right'>" + record.Balance + "</td></tr>";
                                }
                            });
                            ledgerHtml += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                            ledgerHtml1 += "<tr><td></td><td></td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalBill + "</td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + totalPaid + "</td><td></td><td class='text-right font-weight-bold' style='text-align:right;font-weight: 700;'>" + d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance + "</td></tr>";
                            ledgerHtml += "</tbody></table>";
                            ledgerHtml1 += "</tbody></table>";
                            selectedPersonBalance = d.MasterLedgerVm.lstLedger[d.MasterLedgerVm.lstLedger.length - 1].Balance;
                            //$("#statementLedgerDiv").html(ledgerHtml);
                            $("#personCounterEmail").html(peopleCountEmailSetup);
                            $("#personCounterPrint").html(peopleCountNoEmailSetup + peopleCountEmailSetup);
                        }
                        commonTemplate.SetDataInPreviewDivs();
                        //PrintReport.GetAllSavedTemplates();
                    }
                });
            }
        }
    },
    PreviousPersonInfo: function () {
        var id = $("#hdnPersonIdforPreview").val();
        if (id == "") { id = 0 };
        console.log("PreviousBtnClicked");
        console.log("currentId--" + id)
        $.each(AllPeopleList, function (i, v) {
            if (id == v["SelectedPersonId"]) {
                console.log("Current Person Name: " + v["PersonName"])
                flagForPreviewData = true;
                if (i - 1 >= 0) {
                    $("#hdnPersonIdforPreview").val(AllPeopleList[i - 1]["SelectedPersonId"]);
                    console.log("Previous Person Name: " + AllPeopleList[i - 1]["PersonName"])
                    commonTemplate.getPeopleDetailForStatementPreview();
                    //StatementSettings.GetThePersonDetailById(SelectedRowData[i - 1]["PeopleId"]);
                    //PrintReport.getPersonDetailForStatementPreview(objPeopleFilterVmForStatement);
                }
            }
        });
    },
    NextPersonInfo: function () {
        var id = $("#hdnPersonIdforPreview").val();
        if (id == "") { id = 0 };
        console.log("NextBtnClicked");
        console.log("currentId--" + id)
        $.each(AllPeopleList, function (i, v) {
            if (id == v["SelectedPersonId"]) {
                console.log("Current Person Name: " + v["PersonName"])
                //        flagForPreviewData = true;
                if (i + 1 < AllPeopleList.length) {
                    $("#hdnPersonIdforPreview").val(AllPeopleList[i + 1]["SelectedPersonId"]);
                    console.log("Next Person Name: " + AllPeopleList[i + 1]["PersonName"])
                    commonTemplate.getPeopleDetailForStatementPreview();
                }

            }
        });
    },
    SetDataInPreviewDivs: function () {

        document.getElementById("fileAttachmentPreviewNames").innerHTML = "";

        var statementHeader = CKEDITOR.instances.txtStatementHeader.getData();
        var statementBody = CKEDITOR.instances.ckStatementBody.getData();
        var statementFooter = CKEDITOR.instances.txtStatementFooter.getData();
        var subject = $("#txtEmailSubject").val();
        var emailBody = CKEDITOR.instances.editor1.getData();
        if (statementHeader.indexOf('[AdditionalText') != -1 || statementBody.indexOf('[AdditionalText') != -1 || statementFooter.indexOf('[AdditionalText') != -1 || subject.indexOf('[AdditionalText') != -1 || emailBody.indexOf('[AdditionalText') != -1) {
            if (statementHeader.indexOf('[AdditionalText1]') != -1 || statementBody.indexOf('[AdditionalText1]') != -1 || statementFooter.indexOf('[AdditionalText1]') != -1 || subject.indexOf('[AdditionalText1]') != -1 || emailBody.indexOf('[AdditionalText1]') != -1) {
                $("#AdditionalText1Div").removeClass('d-none');
                $("#AdditionalText2Div").addClass('d-none');
                //  statementBody = statementBody.indexOf('[AdditionalText1]').prepend('v');
            } else {
                $("#AdditionalText1Div").addClass('d-none');
            }
            if (statementHeader.indexOf('[AdditionalText2]') != -1 || statementBody.indexOf('[AdditionalText2]') != -1 || statementFooter.indexOf('[AdditionalText2]') != -1 || subject.indexOf('[AdditionalText2]') != -1 || emailBody.indexOf('[AdditionalText2]') != -1) {
                $("#AdditionalText2Div").removeClass('d-none');
            } else {
                if ($("#AdditionalText1Div").hasClass('d-none')) {
                    $("#AdditionalText1Div").addClass('d-none');
                }
            }
        }
        else {
            $("#AdditionalText2Div").addClass('d-none');
            $("#AdditionalText1Div").addClass('d-none');
        }
        if ($("#ViewId").val() != "Job") {
            if ($("#ViewId").val() == "Receipt_Report") {
                // replacing the merge fields for ReceiptFormat with html for them
                statementHeader = Receipt.ReplaceMergeFieldsWithHtml(statementHeader);
                statementBody = Receipt.ReplaceMergeFieldsWithHtml(statementBody);
                statementFooter = Receipt.ReplaceMergeFieldsWithHtml(statementFooter);
                subject = Receipt.ReplaceMergeFieldsWithHtml(subject);
                emailBody = Receipt.ReplaceMergeFieldsWithHtml(emailBody);

                statementHeader = Receipt.ReplaceMergeFields(statementHeader);
                statementBody = Receipt.ReplaceMergeFields(statementBody);
                statementFooter = Receipt.ReplaceMergeFields(statementFooter);
                subject = Receipt.ReplaceMergeFields(subject);
                emailBody = Receipt.ReplaceMergeFields(emailBody);
            }
            else if ($("#ViewId").val() != "Receipt_Report" && $("#ViewId").val() != "Job") {
                statementHeader = PrintReport.ReplaceMergeFields(statementHeader);
                statementBody = PrintReport.ReplaceMergeFields(statementBody);
                statementFooter = PrintReport.ReplaceMergeFields(statementFooter);
                subject = PrintReport.ReplaceMergeFields(subject);
                emailBody = PrintReport.ReplaceMergeFields(emailBody);
            }
            $("#statementHeader").html(statementHeader);
            $("#statementBody").html(statementBody);
            $("#statementFooter").html(statementFooter);
            $("#statementHeaderReport").html(statementHeader);
            $("#statementBodyReport").html(statementBody);
            $("#statementFooterReport").html(statementFooter);
            $("#ckEmailBodyPreview").html(emailBody);
            $("#txtEmailSubjectReportPreview").val(subject);
            statementHeader = commonTemplate.ReplaceAdditionalTextMergeField('statementHeader');
            $("#statementHeader").html(statementHeader);

            statementBody = commonTemplate.ReplaceAdditionalTextMergeField('statementBody');
            $("#statementBody").html(statementBody);

            statementFooter = commonTemplate.ReplaceAdditionalTextMergeField('statementFooter');
            $("#statementFooter").html(statementFooter);
            statementHeader = commonTemplate.ReplaceAdditionalTextMergeField('statementHeaderReport');
            $("#statementHeaderReport").html(statementHeader);

            $("#statementBodyReport").css({ 'text-align': '' });

            statementBody = commonTemplate.ReplaceAdditionalTextMergeField('statementBodyReport');
            $("#statementBodyReport").html(statementBody);

            statementFooter = commonTemplate.ReplaceAdditionalTextMergeField('statementFooterReport');
            $("#statementFooterReport").html(statementFooter);

            if (subject.indexOf('[AdditionalText1]') != -1) {
                if ($("#AdditionalText1").val() != "") {
                    subject = subject.replace(/\[AdditionalText1\]/g, $("#AdditionalText1").val());
                }
            }
            if (subject.indexOf('[AdditionalText2]') != -1) {
                if ($("#AdditionalText2").val() != "") {
                    subject = subject.replace(/\[AdditionalText2\]/g, $("#AdditionalText2").val());
                }
            }
            $("#txtEmailSubjectReportPreview").val(subject);

            emailBody = commonTemplate.ReplaceAdditionalTextMergeField('ckEmailBodyPreview');
            $("#ckEmailBodyPreview").html(emailBody);

        } else {
            Job.PreviewModeInJob();
        }

        var backGroundImagePath = "";
        debugger

        defaultTemplateAttachments = Array.from(arrayFileName);
        //defaultTemplateAttachments.push(...attachment);
        var txt = "<table>"; var txt1 = "<table>";
        if (defaultTemplateAttachments.length > 0) {
            $.each(defaultTemplateAttachments, function (index, value) {
                txt += "<tr><td><a href='" + TemplateFilesPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td><td><i class='btn fa fa-trash' style='color:red;font-size:25px;' data-file='" + value.AttachmentGuid + "'></i></td></tr>";
                txt1 += "<tr><td><a href='" + TemplateFilesPath + value.AttachmentGuid + "'>" + value.OriginalName + "</a></td></tr>";
            });
        }
        //if ((attachment != null || attachment != "") && fileUpload.files.length > 0) {
        //    txt1 += "<tr><td><a href='" + attachment + "'>" + fileUpload.files[0].name + "</a></td></tr>";
        //}

        txt += "</table>"; txt1 += "</table>";
        document.getElementById("fileAttachmentReportNames").innerHTML = txt;
        document.getElementById("fileAttachmentPreviewNames").innerHTML = "ExistingAttachments:<br>" + txt1;

        $("#fileAttachment1").children().remove();
        if ($("#hdnBackgroundImage").val() != null && $("#hdnBackgroundImage").val() != "") {
            backGroundImagePath = location.origin + $("#hdnBackgroundImage").val();
        } else {
            backGroundImagePath = null;
        }

        if ($("#hdnAttachmentsPath").val() != null && $("#hdnAttachmentsPath").val() != "") {
            templateAttachmentPath = $("#hdnAttachmentsPath").val();
        }
        $("#contentContainer").css('background', 'url("' + backGroundImagePath + '")').css('background-repeat', 'no-repeat').css('background-size', '100% 100%');
        //$("#statementSettingModal").modal('hide');
    },
    ReplaceAdditionalTextMergeField: function (containerDiv) {
        containerDiv = $("#" + containerDiv).html();
        if (containerDiv != undefined) {
            if (containerDiv.indexOf('[AdditionalText1]') != -1) {
                if ($("#AdditionalText1").val() != "") {
                    containerDiv = containerDiv.replace(/\[AdditionalText1\]/g, $("#AdditionalText1").val());
                    isAdditionalText1AlreadyReplaced = true;
                }
                else {
                    if (isAdditionalText1AlreadyReplaced)
                        containerDiv = containerDiv.replace(/\[AdditionalText1\]/g, "");
                }

            }
            if (containerDiv.indexOf('[AdditionalText2]') != -1) {
                if ($("#AdditionalText2").val() != "") {
                    containerDiv = containerDiv.replace(/\[AdditionalText2\]/g, $("#AdditionalText2").val());
                    isAdditionalText2AlreadyReplaced = true;
                } else {
                    if (isAdditionalText2AlreadyReplaced)
                        containerDiv = containerDiv.replace(/\[AdditionalText2\]/g, "");
                }

            }
        }
        return containerDiv;
    },

    PrintDiv: function () {
        $("#formatContent").printThis({
            importStyle: true,
        });
    },
    SendEmail: function () {
        debugger;
        var mailStatementContent = $("#formatContent").html();
        var subject = $("#txtEmailSubjectReport").val();
        var dataFromEditor = CKEDITOR.instances.ckEmailBody.getData();

        var fileUpload = $("#fileAttachmentReport").get(0);
        var files = fileUpload.files;
        var addStatementAsAttachment = $("#addStatementAsAttachment").is(':checked');

        // Create FormData object  
        var fileData = new FormData();
        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }
        if (defaultTemplateAttachments.length > 0) {
            var finalArray = defaultTemplateAttachments.map(function (obj) {
                return obj.AttachmentGuid;
            });
            fileData.append('attachments', finalArray.join(','));
        }
        fileData.append('subject', subject);
        fileData.append('mailStatementContent', mailStatementContent.toString());
        fileData.append('mailTemplateContent', dataFromEditor.toString());
        fileData.append('templateAttachmentPath', templateAttachmentPath);
        fileData.append('addStatementAsAttachment', addStatementAsAttachment);


        loader.showloader();
        if ($("#ViewId") == "Receipt_Report") {
            //  loader.showloader();
            fileData.append('attachmentType', 'Receipt');
            ajaxrepository.callServiceForPostAttachments('/Account/EmailStatement', fileData, Receipt.onSendEmailSuccess, commonTemplate.onError, undefined);
        }
        else {
            fileData.append('attachmentType', 'Statement');
            ajaxrepository.callServiceForPostAttachments('/Account/EmailStatement', fileData, PrintReport.onSendEmailSuccess, commonTemplate.onError, undefined);
        }
    },
    SetDefaultStatementFormat: function () {
        var statementFormatId = $("#ddlTemplate option:selected").val();
        var data = "{statementFormatId:" + JSON.stringify(statementFormatId) + "}";
        if ($("#ViewId") == "Receipt_Report") {

            ajaxrepository.callServiceWithPost('/Receipt/SetDefaultStatementFormatForUser', data, commonTemplate.onSetDefaultStatementFormatSuccess, commonTemplate.onError, undefined);
        }
        else {
            ajaxrepository.callServiceWithPost('/Account/SetDefaultStatementFormatsForOrganization', data, commonTemplate.onSetDefaultStatementFormatSuccess, commonTemplate.onError, undefined);
        }
    },
    onSetDefaultStatementFormatSuccess: function (d, s, e) {
        if (s == "success") {
            if (d == 1) {
                notifiy.notification('success', "Selected format set as default", 'success');
                // update the (default text to the new default format);
                var selectedFormat = $("#ddlTemplate").val();
                $("#ddlTemplate option").each(function () {
                    if ($(this).val() == selectedFormat) {
                        $(this).text($(this).text().trim() + " (Default)")
                    } else {
                        $(this).text($(this).text().trim().replace("(Default)", "").trim());
                    }
                });

            } else if (d == -1) {
                notifiy.notification('danger', "Something went wrong", 'danger');
            }
        } else {
            notifiy.notification('danger', "Something went wrong", 'danger');
        }
    },
    onError: function () {
        loader.hideloader();
        notifiy.notification('danger', "Something went wrong", 'danger');
    },
}


$(document).ready(function () {
    // StatementSettings.init();
    // PrintReport.init();
    commonTemplate.init();
});

