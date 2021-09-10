using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Common.MasterModel;
using DataAccess.CustomModel;
using DataAccess.DataModels;
using DataAccess.Interfaces;
using DataAccess.Repositories;

namespace Business.Service
{
    public class ExportManager
    {

        public List<ExportReportMenu> GetFilterDataByOrganizationByPerson()
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetExportFilterDataByOrganizationByPerson(ManagerBase.CurrentUserSession.OrganizationId, ManagerBase.CurrentUserSession.UserId);
                return data;
            }
        }

        public List<ExportReportVm> GetFilteredData(ExportReportFilterSetting setting, string sortcolumn, string sortDir, int start, int length, string searchValue)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                DateTime? anniversaryFrom = null;
                DateTime? anniversaryTo = null;

                if (!string.IsNullOrEmpty(setting.AnniversaryFrom))
                {
                    anniversaryFrom = Convert.ToDateTime(setting.AnniversaryFrom);
                }
                if (!string.IsNullOrEmpty(setting.AnniversaryTo))
                {
                    anniversaryTo = Convert.ToDateTime(setting.AnniversaryTo);
                }

                var marriedEmpty = (setting.MaritalStatus?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (marriedEmpty)
                {
                    // remove empty value from list
                    setting.MaritalStatus.Remove("empty");
                }

                var hTitleEmpty = (setting.TitlesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTitleEmpty)
                {
                    // remove empty value from list
                    setting.TitlesH.Remove("empty");
                }

                var hSuffixEmpty = (setting.SuffixH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hSuffixEmpty)
                {
                    // remove empty value from list
                    setting.SuffixH.Remove("empty");
                }

                var hTribeEmpty = (setting.TribesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTribeEmpty)
                {
                    // remove empty value from list
                    setting.TribesH.Remove("empty");
                }
                var titleEmpty = (setting.Titles?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (titleEmpty)
                {
                    // remove empty value from list
                    setting.Titles.Remove("empty");
                }
                var tribeEmpty = (setting.Tribes?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (tribeEmpty)
                {
                    // remove empty value from list
                    setting.Tribes.Remove("empty");
                }
                var neighborhoodEmpty = (setting.Neighborhoods?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (neighborhoodEmpty)
                {
                    // remove empty value from list 
                    // setting.Neighborhoods.Remove("empty");
                }
                var cityEmpty = (setting.Cities?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (cityEmpty)
                {
                    // remove empty value from list
                    // setting.Cities.Remove("empty");
                }

                var stateEmpty = (setting.States?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (stateEmpty)
                {
                    // remove empty value from list
                    // setting.States.Remove("empty");
                }

                var zipEmpty = (setting.Zip?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (zipEmpty)
                {
                    // remove empty value from list
                    // setting.Zip.Remove("empty");
                }

                var countryEmpty = (setting.Countries?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (countryEmpty)
                {
                    // remove empty value from list
                    // setting.Countries.Remove("empty");
                }


                ExportFilterSettingVm filterSetting = new ExportFilterSettingVm
                {
                    GendersSelected = setting.Genders != null ? string.Join(",", setting.Genders) : string.Empty,
                    MaritalStatusSelected = setting.MaritalStatus != null ? string.Join(",", setting.MaritalStatus) : string.Empty,
                    LivingStatusSelected = setting.LivingStatus != null ? string.Join(",", setting.LivingStatus) : string.Empty,
                    TitlesHSelected = setting.TitlesH != null ? string.Join(",", setting.TitlesH) : string.Empty,
                    SuffixHSelected = setting.SuffixH != null ? string.Join(",", setting.SuffixH) : string.Empty,
                    TribeHSelected = setting.TribesH != null ? string.Join(",", setting.TribesH) : string.Empty,
                    TitlesSelected = setting.Titles != null ? string.Join(",", setting.Titles) : string.Empty,
                    TribesSelected = setting.Tribes != null ? string.Join(",", setting.Tribes) : string.Empty,
                    NeighborhoodsSelected = setting.Neighborhoods != null ? string.Join(",", setting.Neighborhoods) : string.Empty,
                    CitySelected = setting.Cities != null ? string.Join(",", setting.Cities) : string.Empty,
                    StatesSelected = setting.States != null ? string.Join(",", setting.States) : string.Empty,
                    ZipSelected = setting.Zip != null ? string.Join(",", setting.Zip) : string.Empty,
                    CountriesSelected = setting.Countries != null ? string.Join(",", setting.Countries) : string.Empty,
                    AnniversaryFrom = anniversaryFrom,
                    AnniversaryTo = anniversaryTo,
                    SortColumn = sortcolumn,
                    SortDir = sortDir,
                    Start = start,
                    PageSize = length,
                    SearchValue = searchValue
                };
                var data = _unitofWork.ExportRepository.GetFilteredData(filterSetting, marriedEmpty, hTitleEmpty, hSuffixEmpty, hTribeEmpty, titleEmpty, tribeEmpty, neighborhoodEmpty, cityEmpty, stateEmpty, zipEmpty, countryEmpty, ManagerBase.CurrentUserSession.OrganizationId);
                return data;
            }
        }

        public DataTable UpdateDataTable(DataTable dt, List<string> columnOrder)
        {

            // add some columns as it was not available in datatable
            dt.Columns.Add("Tribe", typeof(string));
            dt.Columns.Add("HTribe", typeof(string));

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["TribeId"] != DBNull.Value)
                {
                    var tribeId = Convert.ToInt32(dt.Rows[i]["TribeId"]);
                    if (tribeId == 0)
                        dt.Rows[i]["Tribe"] = "";
                    else
                        dt.Rows[i]["Tribe"] = Enum.GetName(typeof(Tribe), tribeId);

                }
                if (dt.Rows[i]["TribeIdH"] != DBNull.Value)
                {
                    var tribeIdH = Convert.ToInt32(dt.Rows[i]["TribeIdH"]);
                    if (tribeIdH == 0)
                        dt.Rows[i]["HTribe"] = "";
                    else
                        dt.Rows[i]["HTribe"] = Enum.GetName(typeof(TribeH), tribeIdH);

                }
            }

            // Get all columns of datatable
            var dataTableInitialColumns = dt.Columns.Cast<DataColumn>().Select(x => x.ColumnName).ToList();
            var columnsToBedeleted = dataTableInitialColumns.Where(x => !columnOrder.Contains(x)).ToList();

            // removing columns that were not selected
            columnsToBedeleted.ForEach(x =>
            {
                if (dt.Columns.Contains(dt.Columns[x].ColumnName))
                {
                    dt.Columns.Remove(dt.Columns[x]);
                }
            });


            // setting column order
            int columnIndex = 0;
            foreach (var columnName in columnOrder)
            {
                dt.Columns[columnName].SetOrdinal(columnIndex);
                columnIndex++;
            }

            return dt;
        }


        public DataTable ExportToExcelGetDataBasedOnFinancialColumnPassed(ExportReportFilterSetting peopleFilterValues, List<FinancialColumnTypeVm> filterColumns, List<GroupTypeColumnVm> groupTypefilterColumns, string sortcolumn, string sortDir, int start, int length, string searchValue)
        {
            List<ExportReportVm> financialRecord = new List<ExportReportVm>();
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                DateTime? anniversaryFrom = null;
                DateTime? anniversaryTo = null;

                if (!string.IsNullOrEmpty(peopleFilterValues.AnniversaryFrom))
                {
                    anniversaryFrom = Convert.ToDateTime(peopleFilterValues.AnniversaryFrom);
                }
                if (!string.IsNullOrEmpty(peopleFilterValues.AnniversaryTo))
                {
                    anniversaryTo = Convert.ToDateTime(peopleFilterValues.AnniversaryTo);
                }

                var marriedEmpty = (peopleFilterValues.MaritalStatus?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (marriedEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.MaritalStatus.Remove("empty");
                }

                var hTitleEmpty = (peopleFilterValues.TitlesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTitleEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.TitlesH.Remove("empty");
                }

                var hSuffixEmpty = (peopleFilterValues.SuffixH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hSuffixEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.SuffixH.Remove("empty");
                }

                var hTribeEmpty = (peopleFilterValues.TribesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTribeEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.TribesH.Remove("empty");
                }
                var titleEmpty = (peopleFilterValues.Titles?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (titleEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.Titles.Remove("empty");
                }
                var tribeEmpty = (peopleFilterValues.Tribes?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (tribeEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.Tribes.Remove("empty");
                }

                ExportFilterSettingVm filterSetting = new ExportFilterSettingVm
                {
                    GendersSelected = peopleFilterValues.Genders != null ? string.Join(",", peopleFilterValues.Genders) : string.Empty,
                    MaritalStatusSelected = peopleFilterValues.MaritalStatus != null ? string.Join(",", peopleFilterValues.MaritalStatus) : string.Empty,
                    LivingStatusSelected = peopleFilterValues.LivingStatus != null ? string.Join(",", peopleFilterValues.LivingStatus) : string.Empty,
                    TitlesHSelected = peopleFilterValues.TitlesH != null ? string.Join(",", peopleFilterValues.TitlesH) : string.Empty,
                    SuffixHSelected = peopleFilterValues.SuffixH != null ? string.Join(",", peopleFilterValues.SuffixH) : string.Empty,
                    TribeHSelected = peopleFilterValues.TribesH != null ? string.Join(",", peopleFilterValues.TribesH) : string.Empty,
                    TitlesSelected = peopleFilterValues.Titles != null ? string.Join(",", peopleFilterValues.Titles) : string.Empty,
                    TribesSelected = peopleFilterValues.Tribes != null ? string.Join(",", peopleFilterValues.Tribes) : string.Empty,
                    NeighborhoodsSelected = peopleFilterValues.Neighborhoods != null ? string.Join(",", peopleFilterValues.Neighborhoods) : string.Empty,
                    CitySelected = peopleFilterValues.Cities != null ? string.Join(",", peopleFilterValues.Cities) : string.Empty,
                    StatesSelected = peopleFilterValues.States != null ? string.Join(",", peopleFilterValues.States) : string.Empty,
                    ZipSelected = peopleFilterValues.Zip != null ? string.Join(",", peopleFilterValues.Zip) : string.Empty,
                    CountriesSelected = peopleFilterValues.Countries != null ? string.Join(",", peopleFilterValues.Countries) : string.Empty,
                    AnniversaryFrom = anniversaryFrom,
                    AnniversaryTo = anniversaryTo,
                    SortColumn = sortcolumn,
                    SortDir = sortDir,
                    Start = start,
                    PageSize = length,
                    SearchValue = searchValue
                };

                //var filterColumnNames = filterColumns.Select(x => x.ColumnName).ToList();
                var filterColumnIds = filterColumns?.Select(x => x.ColumnId).ToList();
                var filterGroupTypeColumnIds = String.Join(",", groupTypefilterColumns?.Select(x => x.ColumnId).ToList());
                //var columnNames = string.Join(",", filterColumnNames);
                var columnIds = "";
                if (filterColumnIds != null)
                    columnIds = string.Join(",", filterColumnIds);

                return _unitofWork.ExportRepository.ExportToExcelGetDataBasedOnFinancialColumnPassed(filterSetting, marriedEmpty, hTitleEmpty, hSuffixEmpty, hTribeEmpty, titleEmpty, tribeEmpty, columnIds, filterGroupTypeColumnIds, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
            }
        }

        public bool DeleteColumnById(int columnId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var columnInDb = _unitofWork.ExportRepository.GetColumnById(columnId);
                if (columnInDb != null)
                {
                    columnInDb.IsDeleted = true;
                    columnInDb.DeletedDate = DateTime.UtcNow;
                    _unitofWork.Save();
                    return true;
                }
                return false;
            }
        }

        public List<ExportReportVm> GetDataBasedOnFinancialColumnPassed(ExportReportFilterSetting peopleFilterValues, List<FinancialColumnTypeVm> filterColumns, List<GroupTypeColumnVm> groupTypefilterColumns, List<string> selectedGroupTypeColumnNames, string sortcolumn, string sortDir, int start, int length, string searchValue)
        {
            List<ExportReportVm> financialRecord = new List<ExportReportVm>();
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                DateTime? anniversaryFrom = null;
                DateTime? anniversaryTo = null;

                if (!string.IsNullOrEmpty(peopleFilterValues.AnniversaryFrom))
                {
                    anniversaryFrom = Convert.ToDateTime(peopleFilterValues.AnniversaryFrom);
                }
                if (!string.IsNullOrEmpty(peopleFilterValues.AnniversaryTo))
                {
                    anniversaryTo = Convert.ToDateTime(peopleFilterValues.AnniversaryTo);
                }

                var marriedEmpty = (peopleFilterValues.MaritalStatus?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (marriedEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.MaritalStatus.Remove("empty");
                }

                var hTitleEmpty = (peopleFilterValues.TitlesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTitleEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.TitlesH.Remove("empty");
                }

                var hSuffixEmpty = (peopleFilterValues.SuffixH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hSuffixEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.SuffixH.Remove("empty");
                }

                var hTribeEmpty = (peopleFilterValues.TribesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTribeEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.TribesH.Remove("empty");
                }
                var titleEmpty = (peopleFilterValues.Titles?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (titleEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.Titles.Remove("empty");
                }
                var tribeEmpty = (peopleFilterValues.Tribes?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (tribeEmpty)
                {
                    // remove empty value from list
                    peopleFilterValues.Tribes.Remove("empty");
                }

                /*
                var neighborhoodEmpty = (peopleFilterValues.Neighborhoods?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (neighborhoodEmpty)
                {
                    // remove empty value from list
                    // setting.Neighborhoods.Remove("empty");
                }
                var cityEmpty = (peopleFilterValues.Cities?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (cityEmpty)
                {
                    // remove empty value from list
                    // setting.Cities.Remove("empty");
                }

                var stateEmpty = (peopleFilterValues.States?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (stateEmpty)
                {
                    // remove empty value from list
                    // setting.States.Remove("empty");
                }

                var zipEmpty = (peopleFilterValues.Zip?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (zipEmpty)
                {
                    // remove empty value from list
                    // setting.Zip.Remove("empty");
                }

                var countryEmpty = (peopleFilterValues.Countries?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (countryEmpty)
                {
                    // remove empty value from list
                    // setting.Countries.Remove("empty");
                }
                */

                ExportFilterSettingVm filterSetting = new ExportFilterSettingVm
                {

                    GendersSelected = peopleFilterValues.Genders != null ? string.Join(",", peopleFilterValues.Genders) : string.Empty,
                    CriteriaForFinancialColumns = peopleFilterValues.CriteriaForFinancialColumns != null ? string.Join(",", peopleFilterValues.CriteriaForFinancialColumns) : string.Empty,
                    CriteriaForGroupColumns = peopleFilterValues.CriteriaForGroupColumns != null ? string.Join(",", peopleFilterValues.CriteriaForGroupColumns) : string.Empty,
                    MaritalStatusSelected = peopleFilterValues.MaritalStatus != null ? string.Join(",", peopleFilterValues.MaritalStatus) : string.Empty,
                    LivingStatusSelected = peopleFilterValues.LivingStatus != null ? string.Join(",", peopleFilterValues.LivingStatus) : string.Empty,
                    TitlesHSelected = peopleFilterValues.TitlesH != null ? string.Join(",", peopleFilterValues.TitlesH) : string.Empty,
                    SuffixHSelected = peopleFilterValues.SuffixH != null ? string.Join(",", peopleFilterValues.SuffixH) : string.Empty,
                    TribeHSelected = peopleFilterValues.TribesH != null ? string.Join(",", peopleFilterValues.TribesH) : string.Empty,
                    TitlesSelected = peopleFilterValues.Titles != null ? string.Join(",", peopleFilterValues.Titles) : string.Empty,
                    TribesSelected = peopleFilterValues.Tribes != null ? string.Join(",", peopleFilterValues.Tribes) : string.Empty,
                    NeighborhoodsSelected = peopleFilterValues.Neighborhoods != null ? string.Join(",", peopleFilterValues.Neighborhoods) : string.Empty,
                    CitySelected = peopleFilterValues.Cities != null ? string.Join(",", peopleFilterValues.Cities) : string.Empty,
                    StatesSelected = peopleFilterValues.States != null ? string.Join(",", peopleFilterValues.States) : string.Empty,
                    ZipSelected = peopleFilterValues.Zip != null ? string.Join(",", peopleFilterValues.Zip) : string.Empty,
                    CountriesSelected = peopleFilterValues.Countries != null ? string.Join(",", peopleFilterValues.Countries) : string.Empty,
                    AnniversaryFrom = anniversaryFrom,
                    AnniversaryTo = anniversaryTo,
                    SortColumn = sortcolumn,
                    SortDir = sortDir,
                    Start = start,
                    PageSize = length,
                    SearchValue = searchValue
                };

                //var filterColumnNames = filterColumns.Select(x => x.ColumnName).ToList();
                var filterColumnIds = filterColumns?.Select(x => x.ColumnId).ToList();
                var filterGroupTypeColumnIds = groupTypefilterColumns?.Select(x => x.ColumnId).ToList();
                //var columnNames = string.Join(",", filterColumnNames);
                string columnIds = string.Empty;
                string groupTypeColumnIds = string.Empty;
                if (filterColumnIds != null)
                    columnIds = string.Join(",", filterColumnIds);
                if (filterGroupTypeColumnIds != null)
                    groupTypeColumnIds = string.Join(",", filterGroupTypeColumnIds);
                var data = _unitofWork.ExportRepository.GetFilteredDataTableWithFinancialColumnNames(filterSetting, marriedEmpty, hTitleEmpty, hSuffixEmpty, hTribeEmpty, titleEmpty, tribeEmpty, columnIds, groupTypeColumnIds, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);




                // getting data for person details
                for (int i = 0; i < data.Rows.Count; i++)
                {
                    var record = new ExportReportVm();
                    if (data.Rows[i]["PeopleId"] != DBNull.Value)
                        record.PeopleId = Convert.ToInt32(data.Rows[i]["PeopleId"]);
                    if (data.Rows[i]["Name"] != DBNull.Value)
                        record.Name = Convert.ToString(data.Rows[i]["Name"]);
                    if (data.Rows[i]["Title"] != DBNull.Value)
                        record.Title = Convert.ToString(data.Rows[i]["Title"]);
                    if (data.Rows[i]["FirstName"] != DBNull.Value)
                        record.FirstName = Convert.ToString(data.Rows[i]["FirstName"]);
                    if (data.Rows[i]["FirstNameH"] != DBNull.Value)
                        record.FirstNameH = Convert.ToString(data.Rows[i]["FirstNameH"]);
                    if (data.Rows[i]["LastName"] != DBNull.Value)
                        record.LastName = Convert.ToString(data.Rows[i]["LastName"]);
                    if (data.Rows[i]["LastNameH"] != DBNull.Value)
                        record.LastNameH = Convert.ToString(data.Rows[i]["LastNameH"]);
                    if (data.Rows[i]["Aliya"] != DBNull.Value)
                        record.AliyaName = Convert.ToString(data.Rows[i]["Aliya"]);
                    if (data.Rows[i]["HAliya"] != DBNull.Value)
                        record.AliyaNameH = Convert.ToString(data.Rows[i]["HAliya"]);
                    if (data.Rows[i]["CallName"] != DBNull.Value)
                        record.CallName = Convert.ToString(data.Rows[i]["CallName"]);
                    if (data.Rows[i]["HCallName"] != DBNull.Value)
                        record.CallNameH = Convert.ToString(data.Rows[i]["CallName"]);
                    if (data.Rows[i]["TribeId"] != DBNull.Value)
                        record.TribeId = Convert.ToInt32(data.Rows[i]["TribeId"]);
                    if (data.Rows[i]["TribeIdH"] != DBNull.Value)
                        record.TribeIdH = Convert.ToInt32(data.Rows[i]["TribeIdH"]);
                    if (data.Rows[i]["TitleH"] != DBNull.Value)
                        record.TitleH = Convert.ToString(data.Rows[i]["TitleH"]);
                    if (data.Rows[i]["HSuffix"] != DBNull.Value)
                        record.SuffixH = Convert.ToString(data.Rows[i]["HSuffix"]);
                    if (data.Rows[i]["FatherName"] != DBNull.Value)
                        record.FatherName = Convert.ToString(data.Rows[i]["FatherName"]);
                    if (data.Rows[i]["MotherName"] != DBNull.Value)
                        record.MotherName = Convert.ToString(data.Rows[i]["MotherName"]);
                    if (data.Rows[i]["Deceased"] != DBNull.Value)
                        record.Deceased = Convert.ToBoolean(data.Rows[i]["Deceased"]);
                    if (data.Rows[i]["MarriedStatus"] != DBNull.Value)
                        record.MarriedStatus = Convert.ToInt32(data.Rows[i]["MarriedStatus"]);
                    if (data.Rows[i]["GenderId"] != DBNull.Value)
                        record.GenderId = Convert.ToInt32(data.Rows[i]["GenderId"]);
                    if (data.Rows[i]["GenderId"] != DBNull.Value)
                        record.Gender = Enum.GetName(typeof(Gender), record.GenderId);
                    if (data.Rows[i]["Anniversary"] != DBNull.Value)
                        record.Anniversary = Convert.ToDateTime(data.Rows[i]["Anniversary"]);
                    if (data.Rows[i]["DeceasedDate"] != DBNull.Value)
                        record.DeceasedDate = Convert.ToDateTime(data.Rows[i]["DeceasedDate"]);
                    if (data.Rows[i]["HPhone"] != DBNull.Value)
                        record.HPhone = Convert.ToString(data.Rows[i]["HPhone"]);
                    if (data.Rows[i]["Cell"] != DBNull.Value)
                        record.Cell = Convert.ToString(data.Rows[i]["Cell"]);
                    if (data.Rows[i]["Email"] != DBNull.Value)
                        record.Email = Convert.ToString(data.Rows[i]["Email"]);
                    if (data.Rows[i]["HPhone"] != DBNull.Value)
                        record.PhoneNo = Convert.ToString(data.Rows[i]["HPhone"]);
                    if (data.Rows[i]["Address"] != DBNull.Value)
                        record.Address = Convert.ToString(data.Rows[i]["Address"]);
                    if (data.Rows[i]["Neighborhood"] != DBNull.Value)
                        record.Neighborhood = Convert.ToString(data.Rows[i]["Neighborhood"]);
                    if (data.Rows[i]["House"] != DBNull.Value)
                        record.House = Convert.ToString(data.Rows[i]["House"]);
                    if (data.Rows[i]["Street"] != DBNull.Value)
                        record.Street = Convert.ToString(data.Rows[i]["Street"]);
                    if (data.Rows[i]["Apartment"] != DBNull.Value)
                        record.Apartment = Convert.ToString(data.Rows[i]["Apartment"]);
                    if (data.Rows[i]["Line1"] != DBNull.Value)
                        record.Line1 = Convert.ToString(data.Rows[i]["Line1"]);
                    if (data.Rows[i]["Line2"] != DBNull.Value)
                        record.Line2 = Convert.ToString(data.Rows[i]["Line2"]);
                    if (data.Rows[i]["City"] != DBNull.Value)
                        record.City = Convert.ToString(data.Rows[i]["City"]);
                    if (data.Rows[i]["Country"] != DBNull.Value)
                        record.Country = Convert.ToString(data.Rows[i]["Country"]);
                    if (data.Rows[i]["State"] != DBNull.Value)
                        record.State = Convert.ToString(data.Rows[i]["State"]);
                    if (data.Rows[i]["Zip"] != DBNull.Value)
                        record.Zip = Convert.ToString(data.Rows[i]["Zip"]);
                    if (data.Rows[i]["Total"] != DBNull.Value)
                        record.Total = Convert.ToInt32(data.Rows[i]["Total"]);

                    // get the financial columns for all the column passed
                    List<FinancialColumn> pledgeColumns = new List<FinancialColumn>();
                    List<FinancialColumn> paymentColumns = new List<FinancialColumn>();
                    List<ExportGroupColumnVm> groupColumns = new List<ExportGroupColumnVm>();
                    List<ExportGroupColumnVm> groupColumnNotes = new List<ExportGroupColumnVm>();
                    filterColumns?.ForEach(fc =>
                    {
                        if (fc.ColumnType == (int)FilterFor.Pledge)
                        {
                            var colName = fc.ColumnName.Replace(" ", "_");
                            // get the columns on the basis of name for pledges
                            var amountColumn = colName + "_Amount";
                            var paidColumn = colName + "_Paid";
                            var paidPostColumn = colName + "_PaidPost";
                            var dueColumn = colName + "_Due";
                            var dueNowColumn = colName + "_DueNow";

                            if (data.Rows[i][amountColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][amountColumn]);
                                financialObj.ColumnName = amountColumn;
                                pledgeColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = amountColumn;
                                pledgeColumns.Add(financialObj);
                            }

                            if (data.Rows[i][paidColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][paidColumn]);
                                financialObj.ColumnName = paidColumn;
                                pledgeColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = paidColumn;
                                pledgeColumns.Add(financialObj);
                            }

                            if (data.Rows[i][paidPostColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][paidPostColumn]);
                                financialObj.ColumnName = paidPostColumn;
                                pledgeColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = paidPostColumn;
                                pledgeColumns.Add(financialObj);
                            }

                            if (data.Rows[i][dueColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][dueColumn]);
                                financialObj.ColumnName = dueColumn;
                                pledgeColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = dueColumn;
                                pledgeColumns.Add(financialObj);
                            }

                            if (data.Rows[i][dueNowColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][dueNowColumn]);
                                financialObj.ColumnName = dueNowColumn;
                                pledgeColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = dueNowColumn;
                                pledgeColumns.Add(financialObj);
                            }

                        }
                        else if (fc.ColumnType == (int)FilterFor.Payment)
                        {
                            var colName = fc.ColumnName.Replace(" ", "_");

                            // get the columns on the basis of name for payment
                            var paidTotalColumn = colName + "_PaidTotal";
                            var depositedColumn = colName + "_Deposited";
                            var paidPostColumn = colName + "_PaidPost";
                            if (data.Rows[i][paidTotalColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][paidTotalColumn]);
                                financialObj.ColumnName = paidTotalColumn;
                                paymentColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = paidTotalColumn;
                                paymentColumns.Add(financialObj);
                            }

                            if (data.Rows[i][depositedColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][depositedColumn]);
                                financialObj.ColumnName = depositedColumn;
                                paymentColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = depositedColumn;
                                paymentColumns.Add(financialObj);
                            }

                            if (data.Rows[i][paidPostColumn] != DBNull.Value)
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = Convert.ToDecimal(data.Rows[i][paidPostColumn]);
                                financialObj.ColumnName = paidPostColumn;
                                paymentColumns.Add(financialObj);
                            }
                            else
                            {
                                var financialObj = new FinancialColumn();
                                financialObj.ColumnValue = 0;
                                financialObj.ColumnName = paidPostColumn;
                                paymentColumns.Add(financialObj);
                            }
                        }
                    });

                    selectedGroupTypeColumnNames?.ForEach(gtc =>
                    {
                        if (data.Rows[i][gtc] != DBNull.Value)
                        {
                            groupColumns.Add(new ExportGroupColumnVm
                            {
                                ColumnName = gtc,
                                ColumnValue = Convert.ToString(data.Rows[i][gtc])
                            });
                        }

                        if (data.Rows[i][gtc + "_Note"] != DBNull.Value)
                        {
                            groupColumnNotes.Add(new ExportGroupColumnVm
                            {
                                ColumnName = gtc + "_Note",
                                ColumnValue = Convert.ToString(data.Rows[i][gtc + "_Note"])
                            });
                        }
                        else
                        {
                            groupColumnNotes.Add(new ExportGroupColumnVm
                            {
                                ColumnName = gtc + "_Note",
                                ColumnValue = string.Empty
                            });
                        }
                    });
                    record.PledgeFinancialColumns = pledgeColumns;
                    record.PaymentFinancialColumns = paymentColumns;
                    record.GroupTypeColumns = groupColumns;
                    record.GroupTypeColumnNotes = groupColumnNotes;
                    financialRecord.Add(record);
                }
                return financialRecord;
            }
        }

        public int SaveGroupColoumn(PeopleExportGrouptTypeVm peopleExportGrouptTypeVm)
        {
            EntityModel context = new EntityModel();
            SavedFilterGroupTypeColumn savedFilterGroupTypeColumn = new SavedFilterGroupTypeColumn();
            List<SavedFilterGroupTypeColumnName> savedFilterGroupTypeColumnNames = new List<SavedFilterGroupTypeColumnName>();
            List<SavedFilterGroupTypeColumnGroup> savedFilterGroupTypeColumnGroups = new List<SavedFilterGroupTypeColumnGroup>();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSaveFilterGroupTypeColumnById(peopleExportGrouptTypeVm.SavedFilterGroupTypeColumnId);
                if (data != null)// entry exits we have to modify the entry
                {
                    data.FilterName = peopleExportGrouptTypeVm.FilterName;
                    //data.GroupId = peopleExportGrouptTypeVm.GroupId;
                    //data.GroupTypeId = peopleExportGrouptTypeVm.GroupTypeId;
                    data.PersonCriteria = peopleExportGrouptTypeVm.PersonCriteria;
                    data.NotAddColumn = peopleExportGrouptTypeVm.NotAddColumn;
                    data.PrintNote = peopleExportGrouptTypeVm.PrintNote;
                    data.IsDeleted = false;
                    data.CreatedDate = DateTime.UtcNow;
                    data.UserId = ManagerBase.CurrentUserSession.UserId;
                    data.CreatedBy = ManagerBase.CurrentUserSession.UserId;
                    _unitofWork.Save();

                    //getting and removing all group type column name
                    var lstGroupTypeColumn = _unitofWork.ExportRepository.GetAllGroupTypeColumnNameByGroupTypeColumnId(data.SavedFilterGroupTypeColumnId);
                    _unitofWork.ExportRepository.RemoveGroupTypeColumnName(lstGroupTypeColumn);
                    _unitofWork.Save();

                    // saving group type column name
                    savedFilterGroupTypeColumnNames = peopleExportGrouptTypeVm.savedFilterGroupTypeColumnNameVms?.Select(x => new SavedFilterGroupTypeColumnName
                    {
                        ColumnName = x.ColumnName,
                        SavedFilterGroupTypeColumnID = data.SavedFilterGroupTypeColumnId,
                        GroupTypeId = x.GroupTypeId
                    }).ToList();
                    if (savedFilterGroupTypeColumnNames != null)
                        _unitofWork.ExportRepository.AddGroupTypeColumnName(savedFilterGroupTypeColumnNames);
                    _unitofWork.Save();

                    //getting and removing all group id  
                    var lstGroups = _unitofWork.ExportRepository.GetAllGroupTypeColumnGroupByGroupTypeColumnId(data.SavedFilterGroupTypeColumnId);
                    _unitofWork.ExportRepository.RemoveGroupTypeColumnGroup(lstGroups);
                    _unitofWork.Save();

                    // saving groups associated with group type filter
                    savedFilterGroupTypeColumnGroups = peopleExportGrouptTypeVm.savedFilterGroupTypeColumnGroupVms?.Select(x => new SavedFilterGroupTypeColumnGroup
                    {
                        GroupId = x.GroupId,
                        SavedFilterGroupTypeColumnId = data.SavedFilterGroupTypeColumnId
                    }).ToList();
                    if (savedFilterGroupTypeColumnGroups != null)
                        _unitofWork.ExportRepository.AddGroupTypeColumnGroup(savedFilterGroupTypeColumnGroups);
                    _unitofWork.Save();
                    return data.SavedFilterGroupTypeColumnId;

                }
                else// new entry to be made
                {
                    savedFilterGroupTypeColumn.FilterName = peopleExportGrouptTypeVm.FilterName;
                    //savedFilterGroupTypeColumn.GroupId = peopleExportGrouptTypeVm.GroupId;
                    //savedFilterGroupTypeColumn.GroupTypeId = peopleExportGrouptTypeVm.GroupTypeId;
                    savedFilterGroupTypeColumn.PersonCriteria = peopleExportGrouptTypeVm.PersonCriteria;
                    savedFilterGroupTypeColumn.NotAddColumn = peopleExportGrouptTypeVm.NotAddColumn;
                    savedFilterGroupTypeColumn.PrintNote = peopleExportGrouptTypeVm.PrintNote;
                    savedFilterGroupTypeColumn.IsDeleted = false;
                    savedFilterGroupTypeColumn.CreatedDate = DateTime.UtcNow;
                    savedFilterGroupTypeColumn.UserId = ManagerBase.CurrentUserSession.UserId;
                    savedFilterGroupTypeColumn.CreatedBy = ManagerBase.CurrentUserSession.UserId;
                    _unitofWork.ExportRepository.SaveFilterGroupTypeColumn(savedFilterGroupTypeColumn);
                    _unitofWork.Save();

                    // saving group type column name
                    savedFilterGroupTypeColumnNames = peopleExportGrouptTypeVm.savedFilterGroupTypeColumnNameVms?.Select(x => new SavedFilterGroupTypeColumnName
                    {
                        ColumnName = x.ColumnName,
                        SavedFilterGroupTypeColumnID = savedFilterGroupTypeColumn.SavedFilterGroupTypeColumnId,
                        GroupTypeId = x.GroupTypeId
                    }).ToList();
                    if (savedFilterGroupTypeColumnNames != null)
                        _unitofWork.ExportRepository.AddGroupTypeColumnName(savedFilterGroupTypeColumnNames);

                    // saving groups associated with group type filter
                    savedFilterGroupTypeColumnGroups = peopleExportGrouptTypeVm.savedFilterGroupTypeColumnGroupVms?.Select(x => new SavedFilterGroupTypeColumnGroup
                    {
                        GroupId = x.GroupId,
                        SavedFilterGroupTypeColumnId = savedFilterGroupTypeColumn.SavedFilterGroupTypeColumnId
                    }).ToList();
                    if (savedFilterGroupTypeColumnGroups != null)
                        _unitofWork.ExportRepository.AddGroupTypeColumnGroup(savedFilterGroupTypeColumnGroups);
                    _unitofWork.Save();
                    return savedFilterGroupTypeColumn.SavedFilterGroupTypeColumnId;
                }

            }

        }

        public ExportReportGroupMenuData GetGroupFilterMenuData()
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var masterData = new ExportReportGroupMenuData();
                var rawData = _unitofWork.ExportRepository.GetGroupFilterMenuData(ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                var groupTypes = rawData.Select(gt => new GroupTypeVm
                {
                    GroupTypeId = gt.GroupTypeId,
                    GroupType = gt.GroupType
                }).Distinct().ToList();

                var groups = rawData.Select(gt => new GroupsVm
                {
                    GroupId = gt.GroupId == null ? 0 : (int)gt.GroupId,
                    Group = gt.Group.EmptyIfNull()
                }).Distinct().ToList();

                masterData.Groups = groups;
                masterData.GroupTypes = groupTypes;
                masterData.RawData = rawData;

                return masterData;
            }
        }

        public bool CheckForFinancialColumn(int ColumnId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var rawData = _unitofWork.ExportRepository.GetFinancialColumn(ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                foreach (var items in rawData)
                {
                    if (items.SaveFilterColumnIds != null)
                    {
                        string[] ColumnList = items.SaveFilterColumnIds.Split(',');
                        foreach (string str in ColumnList)
                        {
                            if (str == ColumnId.ToString())
                            {
                                return true;
                            }
                        }
                    }
                }

            }
            return false;
        }

        public bool DeleteColumnByName(string columnName)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var columnInDb = _unitofWork.ExportRepository.GetSavedFilterDataByColumnName(columnName, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                if (columnInDb != null)
                {
                    columnInDb.IsDeleted = true;
                    columnInDb.DeletedDate = DateTime.UtcNow;
                    _unitofWork.Save();
                    return true;
                }
                return false;
            }
        }

        public List<SavedFilterColumnVM> GetSavedColumns()
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSavedColumnsByUser(ManagerBase.CurrentUserSession.UserId).Select(col => new SavedFilterColumnVM
                {
                    AmountMax = col.AmountMax,
                    AmountMin = col.AmountMin,
                    CampaignSelected = col.CampaignSelected,
                    CategorySelected = col.CategorySelected,
                    ColumnId = col.ColumnId,
                    ColumnName = col.ColumnName,
                    Description = col.Description,
                    DescColumns = col.DescColumns,
                    Event1Selected = col.Event1Selected,
                    Event2Selected = col.Event2Selected,
                    FilterFor = col.FilterFor,
                    FromDate = col.FromDate,
                    Honoree1Selected = col.Honoree1Selected,
                    Honoree2Selected = col.Honoree2Selected,
                    Neighborhood = col.Neighborhood,
                    PaymentBy = col.PaymentBy,
                    PledgeBy = col.PledgeBy,
                    PledgeTypeSelected = col.PledgeTypeSelected,
                    SelectBy = col.SelectBy,
                    Solicitor1Selected = col.Solicitor1Selected,
                    Solicitor2Selected = col.Solicitor2Selected,
                    Solicitor3Selected = col.Solicitor3Selected,
                    Solicitor4Selected = col.Solicitor4Selected,
                    ToDate = col.ToDate,
                    PersonCriteria = col.PersonCriteria,
                    YearSelected = col.YearSelected
                }).ToList();

                return data;
            }
        }

        public List<ExportReportVm> GetFilteredDataWithFinancialColumns(ExportReportFilterSetting filterValues, List<FinancialReportFilterSetting> financialFilterCriterias, string sortcolumn, string sortDir, int start, int length, string searchValue)
        {
            var phase1Data = GetFilteredData(filterValues, sortcolumn, sortDir, start, length, searchValue);
            var peopleIds = phase1Data.Select(x => x.PeopleId).ToList();
            var financialFilterPledgeCriterias = financialFilterCriterias.Where(criteria => criteria.FilterFor == (int)FilterFor.Pledge).ToList();
            var financialFilterPaymentCriterias = financialFilterCriterias.Where(criteria => criteria.FilterFor == (int)FilterFor.Payment).ToList();

            financialFilterPledgeCriterias.ForEach(setting =>
            {
                // here we get the financial column for the selected person
                var additionalColumns = GetFinancialPledgeDataForSelectedPersonById(setting, peopleIds);
                // get the financial data columns
                peopleIds.ForEach(personId =>
                {
                    var columnList = new List<FinancialColumn>();
                    var financialDataAgainstSeletedPerson = additionalColumns.Where(col => col.PersonId == personId).FirstOrDefault();
                    if (financialDataAgainstSeletedPerson != null) // record found
                    {
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.Amount,
                            ColumnName = setting.settingName + "_Amount"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.Paid,
                            ColumnName = setting.settingName + "_Paid"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.PaidPost,
                            ColumnName = setting.settingName + "_PaidPost"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.Due,
                            ColumnName = setting.settingName + "_Due"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.DueNow,
                            ColumnName = setting.settingName + "_DueNow"
                        });
                    }
                    else // record not found
                    {
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_Amount"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_Paid"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_PaidPost"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_Due"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_DueNow"
                        });
                    }
                    var personDetailedData = phase1Data.Where(p1data => p1data.PeopleId == personId).FirstOrDefault();
                    personDetailedData.PledgeFinancialColumns.AddRange(columnList);
                });

            });

            // adding financial columns
            financialFilterPaymentCriterias.ForEach(setting =>
            {
                // here we get the financial column for the selected person
                var additionalColumns = GetFinancialPaymentDataForSelectedPersonById(setting, peopleIds);
                // get the financial data columns
                peopleIds.ForEach(personId =>
                {
                    var columnList = new List<FinancialColumn>();
                    var financialDataAgainstSeletedPerson = additionalColumns.Where(col => col.PersonId == personId).FirstOrDefault();
                    if (financialDataAgainstSeletedPerson != null) // record found
                    {
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.PaidPost,
                            ColumnName = setting.settingName + "_PaidPost"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.PaidTotal,
                            ColumnName = setting.settingName + "_PaidTotal"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = financialDataAgainstSeletedPerson.Deposited,
                            ColumnName = setting.settingName + "_Deposited"
                        });
                    }
                    else // record not found
                    {
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_PaidPost"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_PaidTotal"
                        });
                        columnList.Add(new FinancialColumn
                        {
                            ColumnValue = 0,
                            ColumnName = setting.settingName + "_Deposited"
                        });
                    }
                    var personDetailedData = phase1Data.Where(p1data => p1data.PeopleId == personId).FirstOrDefault();
                    personDetailedData.PaymentFinancialColumns.AddRange(columnList);
                });
            });
            return phase1Data;
        }

        public int SaveFinancialFilterSetting(FinancialReportFilterSettingVm settingToBeSaved)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                // find if any filter Exists with same name
                //var data = _unitofWork.ExportRepository.GetSavedFilterDataByColumnName(settingToBeSaved.ColumnName, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                var data = _unitofWork.ExportRepository.GetColumnById(settingToBeSaved.ColumnId);
                if (data != null) // entry exits we have to modify the entry
                {
                    data.PaymentBy = settingToBeSaved.PaymentBy;
                    data.PledgeBy = settingToBeSaved.PledgeBy;
                    data.FilterFor = settingToBeSaved.FilterFor;
                    data.SelectBy = settingToBeSaved.SelectBy ?? 3;
                    data.AmountMax = settingToBeSaved.MaxAmount;
                    data.AmountMin = settingToBeSaved.MinAmount;
                    data.CampaignSelected = settingToBeSaved.CampaignSelected;
                    data.CategorySelected = settingToBeSaved.CategorySelected;
                    data.Event1Selected = settingToBeSaved.Event1Selected;
                    data.Event2Selected = settingToBeSaved.Event2Selected;
                    data.Honoree1Selected = settingToBeSaved.Honoree1Selected;
                    data.Honoree2Selected = settingToBeSaved.Honoree2Selected;
                    data.ColumnName = settingToBeSaved.FiterSettingName;
                    data.Description = settingToBeSaved.Description;
                    data.Neighborhood = settingToBeSaved.NeighbourhoodSelected;
                    data.PledgeTypeSelected = settingToBeSaved.PledgeTypeSelected;
                    data.Solicitor1Selected = settingToBeSaved.Solicitor1Selected;
                    data.Solicitor2Selected = settingToBeSaved.Solicitor2Selected;
                    data.Solicitor3Selected = settingToBeSaved.Solicitor3Selected;
                    data.Solicitor4Selected = settingToBeSaved.Solicitor4Selected;
                    data.YearSelected = settingToBeSaved.YearSelected;
                    data.DescColumns = settingToBeSaved.ColumnSelected;
                    data.FromDate = settingToBeSaved.FromDate;
                    data.ToDate = settingToBeSaved.ToDate;
                    data.PersonCriteria = settingToBeSaved.PersonCriteria;
                    data.UserId = ManagerBase.CurrentUserSession.UserId;
                    data.OrganizationId = ManagerBase.CurrentUserSession.OrganizationId;
                    data.ModifiedDate = DateTime.UtcNow;
                    _unitofWork.Save();
                    return data.ColumnId;
                }
                else // new entry had to be made
                {
                    SavedFilterColumn financialReportFilterSetting = new SavedFilterColumn
                    {
                        PaymentBy = settingToBeSaved.PaymentBy,
                        PledgeBy = settingToBeSaved.PledgeBy,
                        FilterFor = settingToBeSaved.FilterFor,
                        SelectBy = settingToBeSaved.SelectBy ?? 3,
                        AmountMax = settingToBeSaved.MaxAmount,
                        AmountMin = settingToBeSaved.MinAmount,
                        CampaignSelected = settingToBeSaved.CampaignSelected,
                        CategorySelected = settingToBeSaved.CategorySelected,
                        Event1Selected = settingToBeSaved.Event1Selected,
                        Event2Selected = settingToBeSaved.Event2Selected,
                        Honoree1Selected = settingToBeSaved.Honoree1Selected,
                        Honoree2Selected = settingToBeSaved.Honoree2Selected,
                        ColumnName = settingToBeSaved.FiterSettingName,
                        Description = settingToBeSaved.Description,
                        Neighborhood = settingToBeSaved.NeighbourhoodSelected,
                        PledgeTypeSelected = settingToBeSaved.PledgeTypeSelected,
                        Solicitor1Selected = settingToBeSaved.Solicitor1Selected,
                        Solicitor2Selected = settingToBeSaved.Solicitor2Selected,
                        Solicitor3Selected = settingToBeSaved.Solicitor3Selected,
                        Solicitor4Selected = settingToBeSaved.Solicitor4Selected,
                        YearSelected = settingToBeSaved.YearSelected,
                        DescColumns = settingToBeSaved.ColumnSelected,
                        ToDate = settingToBeSaved.ToDate,
                        FromDate = settingToBeSaved.FromDate,
                        PersonCriteria = settingToBeSaved.PersonCriteria,
                        UserId = ManagerBase.CurrentUserSession.UserId,
                        OrganizationId = ManagerBase.CurrentUserSession.OrganizationId,
                        CreatedDate = DateTime.UtcNow,
                    };
                    _unitofWork.ExportRepository.SaveFinancialFilterSetting(financialReportFilterSetting);
                    _unitofWork.Save();
                    return financialReportFilterSetting.ColumnId;
                }
            }
        }

        private string CreateQueryStringForFinancialFilter(List<FinancialReportFilterSetting> financialFilterCriterias)
        {
            var str = "";
            financialFilterCriterias.ForEach(setting =>
            {

                var CategorySelected = setting.CategoryIds != null ? string.Join(",", setting.CategoryIds) : string.Empty;
                var CampaignSelected = setting.CampaignIds != null ? string.Join(",", setting.CampaignIds) : string.Empty;
                var YearSelected = setting.Years != null ? string.Join(",", setting.Years) : string.Empty;
                var PledgeTypeSelected = setting.PledgeTypeIds != null ? string.Join(",", setting.PledgeTypeIds) : string.Empty;
                var Solicitor1Selected = setting.Solicitor1Ids != null ? string.Join(",", setting.Solicitor1Ids) : string.Empty;
                var Solicitor2Selected = setting.Solicitor2Ids != null ? string.Join(",", setting.Solicitor2Ids) : string.Empty;
                var Solicitor3Selected = setting.Solicitor3Ids != null ? string.Join(",", setting.Solicitor3Ids) : string.Empty;
                var Solicitor4Selected = setting.Solicitor4Ids != null ? string.Join(",", setting.Solicitor4Ids) : string.Empty;
                var Honoree1Selected = setting.Honoree1Ids != null ? string.Join(",", setting.Honoree1Ids) : string.Empty;
                var Honoree2Selected = setting.Honoree2Ids != null ? string.Join(",", setting.Honoree2Ids) : string.Empty;
                var Event1Selected = setting.Event1Ids != null ? string.Join(",", setting.Event1Ids) : string.Empty;
                var Event2Selected = setting.Event2Ids != null ? string.Join(",", setting.Event2Ids) : string.Empty;
                var NeighbourhoodSelected = setting.Neighbourhoods != null ? string.Join(",", setting.Neighbourhoods) : string.Empty;
                var GroupSelected = setting.GroupIds != null ? string.Join(",", setting.GroupIds) : string.Empty;
                var GroupBy = setting.GroupBy != null ? string.Join(",", setting.GroupBy) : string.Empty;
                var FromDate = setting.FromDate;
                var ToDate = setting.ToDate;
                var PledgesBy = setting.PledgeBy;
                var PaymentBy = setting.PaymentBy;
                var SelectBy = setting.SelectBy;
                var AmountMax = setting.MaxAmount;
                var AmountMin = setting.MinAmount;

                str = str + "||CategorySelected:" + CategorySelected + "||CampaignSelected:" + CampaignSelected + "||CampaignSelected|";
                str += "|||";
            });
            return str;
        }

        public List<ExportReportVm> GetFilteredDataTableWithFinancialColumns(ExportReportFilterSetting filterValues, string sortcolumn, string sortDir, int start, int length, string searchValue)
        {
            var financialRecord = new List<ExportReportVm>();
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                DateTime? anniversaryFrom = null;
                DateTime? anniversaryTo = null;

                if (!string.IsNullOrEmpty(filterValues.AnniversaryFrom))
                {
                    anniversaryFrom = Convert.ToDateTime(filterValues.AnniversaryFrom);
                }
                if (!string.IsNullOrEmpty(filterValues.AnniversaryTo))
                {
                    anniversaryTo = Convert.ToDateTime(filterValues.AnniversaryTo);
                }

                var marriedEmpty = (filterValues.MaritalStatus?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (marriedEmpty)
                {
                    // remove empty value from list
                    filterValues.MaritalStatus.Remove("empty");
                }

                var hTitleEmpty = (filterValues.TitlesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTitleEmpty)
                {
                    // remove empty value from list
                    filterValues.TitlesH.Remove("empty");
                }

                var hSuffixEmpty = (filterValues.SuffixH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hSuffixEmpty)
                {
                    // remove empty value from list
                    filterValues.SuffixH.Remove("empty");
                }

                var hTribeEmpty = (filterValues.TribesH?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (hTribeEmpty)
                {
                    // remove empty value from list
                    filterValues.TribesH.Remove("empty");
                }
                var titleEmpty = (filterValues.Titles?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (titleEmpty)
                {
                    // remove empty value from list
                    filterValues.Titles.Remove("empty");
                }
                var tribeEmpty = (filterValues.Tribes?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (tribeEmpty)
                {
                    // remove empty value from list
                    filterValues.Tribes.Remove("empty");
                }
                var neighborhoodEmpty = (filterValues.Neighborhoods?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (neighborhoodEmpty)
                {
                    // remove empty value from list
                    // setting.Neighborhoods.Remove("empty");
                }
                var cityEmpty = (filterValues.Cities?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (cityEmpty)
                {
                    // remove empty value from list
                    // setting.Cities.Remove("empty");
                }

                var stateEmpty = (filterValues.States?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (stateEmpty)
                {
                    // remove empty value from list
                    // setting.States.Remove("empty");
                }

                var zipEmpty = (filterValues.Zip?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (zipEmpty)
                {
                    // remove empty value from list
                    // setting.Zip.Remove("empty");
                }

                var countryEmpty = (filterValues.Countries?.Where(x => x.Equals("empty")).FirstOrDefault() != null ? true : false);
                if (countryEmpty)
                {
                    // remove empty value from list
                    // setting.Countries.Remove("empty");
                }


                ExportFilterSettingVm filterSetting = new ExportFilterSettingVm
                {
                    GendersSelected = filterValues.Genders != null ? string.Join(",", filterValues.Genders) : string.Empty,
                    MaritalStatusSelected = filterValues.MaritalStatus != null ? string.Join(",", filterValues.MaritalStatus) : string.Empty,
                    LivingStatusSelected = filterValues.LivingStatus != null ? string.Join(",", filterValues.LivingStatus) : string.Empty,
                    TitlesHSelected = filterValues.TitlesH != null ? string.Join(",", filterValues.TitlesH) : string.Empty,
                    SuffixHSelected = filterValues.SuffixH != null ? string.Join(",", filterValues.SuffixH) : string.Empty,
                    TribeHSelected = filterValues.TribesH != null ? string.Join(",", filterValues.TribesH) : string.Empty,
                    TitlesSelected = filterValues.Titles != null ? string.Join(",", filterValues.Titles) : string.Empty,
                    TribesSelected = filterValues.Tribes != null ? string.Join(",", filterValues.Tribes) : string.Empty,
                    NeighborhoodsSelected = filterValues.Neighborhoods != null ? string.Join(",", filterValues.Neighborhoods) : string.Empty,
                    CitySelected = filterValues.Cities != null ? string.Join(",", filterValues.Cities) : string.Empty,
                    StatesSelected = filterValues.States != null ? string.Join(",", filterValues.States) : string.Empty,
                    ZipSelected = filterValues.Zip != null ? string.Join(",", filterValues.Zip) : string.Empty,
                    CountriesSelected = filterValues.Countries != null ? string.Join(",", filterValues.Countries) : string.Empty,
                    AnniversaryFrom = anniversaryFrom,
                    AnniversaryTo = anniversaryTo,
                    SortColumn = sortcolumn,
                    SortDir = sortDir,
                    Start = start,
                    PageSize = length,
                    SearchValue = searchValue
                };

                //var financialQueryString = CreateQueryStringForFinancialFilter(financialFilterCriterias);

                var data = _unitofWork.ExportRepository.GetFilteredDataTableWithFinancialColumns(filterSetting, marriedEmpty, hTitleEmpty, hSuffixEmpty, hTribeEmpty, titleEmpty, tribeEmpty, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);

                for (int i = 0; i < data.Rows.Count; i++)
                {
                    var record = new ExportReportVm();
                    if (data.Rows[i]["PeopleId"] != DBNull.Value)
                        record.PeopleId = Convert.ToInt32(data.Rows[i]["PeopleId"]);
                    if (data.Rows[i]["Title"] != DBNull.Value)
                        record.Title = Convert.ToString(data.Rows[i]["Title"]);
                    if (data.Rows[i]["FirstName"] != DBNull.Value)
                        record.FirstName = Convert.ToString(data.Rows[i]["FirstName"]);
                    if (data.Rows[i]["FirstNameH"] != DBNull.Value)
                        record.FirstNameH = Convert.ToString(data.Rows[i]["FirstNameH"]);
                    if (data.Rows[i]["LastName"] != DBNull.Value)
                        record.LastName = Convert.ToString(data.Rows[i]["LastName"]);
                    if (data.Rows[i]["LastNameH"] != DBNull.Value)
                        record.LastNameH = Convert.ToString(data.Rows[i]["LastNameH"]);
                    if (data.Rows[i]["AliyaName"] != DBNull.Value)
                        record.AliyaName = Convert.ToString(data.Rows[i]["AliyaName"]);
                    if (data.Rows[i]["AliyaNameH"] != DBNull.Value)
                        record.AliyaNameH = Convert.ToString(data.Rows[i]["AliyaNameH"]);
                    if (data.Rows[i]["Address"] != DBNull.Value)
                        record.Address = Convert.ToString(data.Rows[i]["Address"]);
                    if (data.Rows[i]["CallName"] != DBNull.Value)
                        record.CallName = Convert.ToString(data.Rows[i]["CallName"]);
                    if (data.Rows[i]["CallNameH"] != DBNull.Value)
                        record.CallNameH = Convert.ToString(data.Rows[i]["CallNameH"]);
                    if (data.Rows[i]["Neighborhood"] != DBNull.Value)
                        record.Neighborhood = Convert.ToString(data.Rows[i]["Neighborhood"]);
                    if (data.Rows[i]["TitleH"] != DBNull.Value)
                        record.TitleH = Convert.ToString(data.Rows[i]["TitleH"]);
                    if (data.Rows[i]["SuffixH"] != DBNull.Value)
                        record.SuffixH = Convert.ToString(data.Rows[i]["SuffixH"]);
                    if (data.Rows[i]["HPhone"] != DBNull.Value)
                        record.PhoneNo = Convert.ToString(data.Rows[i]["HPhone"]);
                    if (data.Rows[i]["HPhone"] != DBNull.Value)
                        record.HPhone = Convert.ToString(data.Rows[i]["HPhone"]);
                    if (data.Rows[i]["House"] != DBNull.Value)
                        record.House = Convert.ToString(data.Rows[i]["House"]);
                    if (data.Rows[i]["Street"] != DBNull.Value)
                        record.Street = Convert.ToString(data.Rows[i]["Street"]);
                    if (data.Rows[i]["Apartment"] != DBNull.Value)
                        record.Apartment = Convert.ToString(data.Rows[i]["Apartment"]);
                    if (data.Rows[i]["Line1"] != DBNull.Value)
                        record.Line1 = Convert.ToString(data.Rows[i]["Line1"]);
                    if (data.Rows[i]["Line2"] != DBNull.Value)
                        record.Line2 = Convert.ToString(data.Rows[i]["Line2"]);
                    //record.AreaCode = Convert.ToInt32(data.Rows[i]["LastName"]);
                    //record.Extension = Convert.ToString(data.Rows[i]["LastName"]);
                    if (data.Rows[i]["City"] != DBNull.Value)
                        record.City = Convert.ToString(data.Rows[i]["City"]);
                    if (data.Rows[i]["Country"] != DBNull.Value)
                        record.Country = Convert.ToString(data.Rows[i]["Country"]);
                    if (data.Rows[i]["State"] != DBNull.Value)
                        record.State = Convert.ToString(data.Rows[i]["State"]);
                    if (data.Rows[i]["Zip"] != DBNull.Value)
                        record.Zip = Convert.ToString(data.Rows[i]["Zip"]);
                    if (data.Rows[i]["FatherName"] != DBNull.Value)
                        record.FatherName = Convert.ToString(data.Rows[i]["FatherName"]);
                    if (data.Rows[i]["MotherName"] != DBNull.Value)
                        record.MotherName = Convert.ToString(data.Rows[i]["MotherName"]);
                    if (data.Rows[i]["Deceased"] != DBNull.Value)
                        record.Deceased = Convert.ToBoolean(data.Rows[i]["Deceased"]);
                    if (data.Rows[i]["MarriedStatus"] != DBNull.Value)
                        record.MarriedStatus = Convert.ToInt32(data.Rows[i]["MarriedStatus"]);
                    //record.TribeId = Convert.ToInt32(data.Rows[i]["LastName"]);
                    //record.TribeIdH = Convert.ToInt32(data.Rows[i]["LastName"]);
                    if (data.Rows[i]["GenderId"] != DBNull.Value)
                        record.GenderId = Convert.ToInt32(data.Rows[i]["GenderId"]);
                    if (data.Rows[i]["GenderId"] != DBNull.Value)
                        record.Gender = Enum.GetName(typeof(Gender), record.GenderId);
                    if (data.Rows[i]["Anniversary"] != DBNull.Value)
                        record.Anniversary = Convert.ToDateTime(data.Rows[i]["Anniversary"]);
                    if (data.Rows[i]["DeceasedDate"] != DBNull.Value)
                        record.DeceasedDate = Convert.ToDateTime(data.Rows[i]["DeceasedDate"]);
                    if (data.Rows[i]["Cell"] != DBNull.Value)
                        record.Cell = Convert.ToString(data.Rows[i]["Cell"]);
                    if (data.Rows[i]["Email"] != DBNull.Value)
                        record.Email = Convert.ToString(data.Rows[i]["Email"]);
                    if (data.Rows[i]["Total"] != DBNull.Value)
                        record.Total = Convert.ToInt32(data.Rows[i]["Total"]);
                    financialRecord.Add(record);
                }
                return financialRecord;
            }
        }

        public List<FilteredPledgeDataVm> GetFinancialPledgeDataForSelectedPersonById(FinancialReportFilterSetting setting, List<int> peopleId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                FinancialFilterSetting filterSetting = new FinancialFilterSetting
                {
                    CategorySelected = setting.CategoryIds != null ? string.Join(",", setting.CategoryIds) : string.Empty,
                    CampaignSelected = setting.CampaignIds != null ? string.Join(",", setting.CampaignIds) : string.Empty,
                    YearSelected = setting.Years != null ? string.Join(",", setting.Years) : string.Empty,
                    PledgeTypeSelected = setting.PledgeTypeIds != null ? string.Join(",", setting.PledgeTypeIds) : string.Empty,
                    Solicitor1Selected = setting.Solicitor1Ids != null ? string.Join(",", setting.Solicitor1Ids) : string.Empty,
                    Solicitor2Selected = setting.Solicitor2Ids != null ? string.Join(",", setting.Solicitor2Ids) : string.Empty,
                    Solicitor3Selected = setting.Solicitor3Ids != null ? string.Join(",", setting.Solicitor3Ids) : string.Empty,
                    Solicitor4Selected = setting.Solicitor4Ids != null ? string.Join(",", setting.Solicitor4Ids) : string.Empty,
                    Honoree1Selected = setting.Honoree1Ids != null ? string.Join(",", setting.Honoree1Ids) : string.Empty,
                    Honoree2Selected = setting.Honoree2Ids != null ? string.Join(",", setting.Honoree2Ids) : string.Empty,
                    Event1Selected = setting.Event1Ids != null ? string.Join(",", setting.Event1Ids) : string.Empty,
                    Event2Selected = setting.Event2Ids != null ? string.Join(",", setting.Event2Ids) : string.Empty,
                    NeighbourhoodSelected = setting.Neighbourhoods != null ? string.Join(",", setting.Neighbourhoods) : string.Empty,
                    GroupSelected = setting.GroupIds != null ? string.Join(",", setting.GroupIds) : string.Empty,
                    GroupBy = setting.GroupBy != null ? string.Join(",", setting.GroupBy) : string.Empty,
                    FromDate = setting.FromDate,
                    ToDate = setting.ToDate,
                    PledgesBy = setting.PledgeBy,
                    PaymentBy = setting.PaymentBy,
                    SelectBy = setting.SelectBy,
                    AmountMax = setting.MaxAmount,
                    AmountMin = setting.MinAmount,
                };
                var data = _unitofWork.ExportRepository.GetFinancialPledgeDataForSelectedPersonById(filterSetting, peopleId, ManagerBase.CurrentUserSession.OrganizationId, ManagerBase.CurrentUserSession.UserId);
                return data;
            }
        }

        public List<FilteredPaymentDataVm> GetFinancialPaymentDataForSelectedPersonById(FinancialReportFilterSetting setting, List<int> peopleId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                FinancialFilterSetting filterSetting = new FinancialFilterSetting
                {
                    CategorySelected = setting.CategoryIds != null ? string.Join(",", setting.CategoryIds) : string.Empty,
                    CampaignSelected = setting.CampaignIds != null ? string.Join(",", setting.CampaignIds) : string.Empty,
                    YearSelected = setting.Years != null ? string.Join(",", setting.Years) : string.Empty,
                    PledgeTypeSelected = setting.PledgeTypeIds != null ? string.Join(",", setting.PledgeTypeIds) : string.Empty,
                    Solicitor1Selected = setting.Solicitor1Ids != null ? string.Join(",", setting.Solicitor1Ids) : string.Empty,
                    Solicitor2Selected = setting.Solicitor2Ids != null ? string.Join(",", setting.Solicitor2Ids) : string.Empty,
                    Solicitor3Selected = setting.Solicitor3Ids != null ? string.Join(",", setting.Solicitor3Ids) : string.Empty,
                    Solicitor4Selected = setting.Solicitor4Ids != null ? string.Join(",", setting.Solicitor4Ids) : string.Empty,
                    Honoree1Selected = setting.Honoree1Ids != null ? string.Join(",", setting.Honoree1Ids) : string.Empty,
                    Honoree2Selected = setting.Honoree2Ids != null ? string.Join(",", setting.Honoree2Ids) : string.Empty,
                    Event1Selected = setting.Event1Ids != null ? string.Join(",", setting.Event1Ids) : string.Empty,
                    Event2Selected = setting.Event2Ids != null ? string.Join(",", setting.Event2Ids) : string.Empty,
                    NeighbourhoodSelected = setting.Neighbourhoods != null ? string.Join(",", setting.Neighbourhoods) : string.Empty,
                    GroupSelected = setting.GroupIds != null ? string.Join(",", setting.GroupIds) : string.Empty,
                    GroupBy = setting.GroupBy != null ? string.Join(",", setting.GroupBy) : string.Empty,
                    FromDate = setting.FromDate,
                    ToDate = setting.ToDate,
                    PledgesBy = setting.PledgeBy,
                    PaymentBy = setting.PaymentBy,
                    SelectBy = setting.SelectBy,
                    AmountMax = setting.MaxAmount,
                    AmountMin = setting.MinAmount,
                };
                var data = _unitofWork.ExportRepository.GetFinancialPaymentDataForSelectedPersonById(filterSetting, peopleId, ManagerBase.CurrentUserSession.OrganizationId, ManagerBase.CurrentUserSession.UserId);
                return data;
            }
        }

        public bool DeleteSavedFilterById(int filterId)
        {
            bool flag = true;
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSavedFilterDataById(filterId, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                var Jobdata = _unitofWork.JobRepository.GetJobsForCriteria(ManagerBase.CurrentUserSession.OrganizationId);
                foreach (var items in Jobdata)
                {
                    if (items.CriteriaId == data.FilterSettingId)
                    {
                        if (items.Status == "Pending")
                        {
                            flag = false;
                            break;
                        }
                    }
                }
                if (data != null && flag)
                {
                    data.IsDeleted = true;
                    data.DeletedDate = DateTime.UtcNow;
                    data.DeletedBy = ManagerBase.CurrentUserSession.UserId;
                }
                else
                {
                    return false;
                }
                _unitofWork.Save();
            }

            return true;
        }
        public bool CheckFilterUsedForJobs(int filterId)
        {
            bool flag = true;
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSavedFilterDataById(filterId, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                var Jobdata = _unitofWork.JobRepository.GetJobsForCriteria(ManagerBase.CurrentUserSession.OrganizationId);
                foreach (var items in Jobdata)
                {
                    if (items.CriteriaId == data.FilterSettingId)
                    {
                        if (items.Status == "Pending")
                        {
                            flag = false;
                            break;
                        }
                    }
                }
                if (!flag)
                {
                    return false;
                }

            }
            return true;
        }

        public void PutJobsOnHold(int filterId)
        {

            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSavedFilterDataById(filterId, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                var Jobdata = _unitofWork.JobRepository.GetJobsForCriteria(ManagerBase.CurrentUserSession.OrganizationId);
                foreach (var items in Jobdata)
                {
                    if (items.CriteriaId == data.FilterSettingId)
                    {
                        if (items.Status == "Pending")
                        {
                            // flag = false;
                            items.Hold = true;
                            items.ScheduledDateTime = null;
                            items.Scheduled = false;
                        }
                    }
                }

                _unitofWork.Save();
            }

        }

        public bool SavePeopleOrganizationUserSetting(List<TableSetting> lstTableSetting)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                if (!ManagerBase.CurrentUserSession.IsOrganizationAdmin)
                {
                    var data = _unitofWork.CommonRepository.GetOrganizationUserSetting(ManagerBase.CurrentUserSession.OrganizationId, ManagerBase.CurrentUserSession.UserId, Enum.GetName(typeof(ModuleName), ModuleName.Export));
                    if (data.Count > 0)
                    {
                        _unitofWork.CommonRepository.RemoveOrganizationUserSetting(data);

                    }
                    List<OrganizationUserSetting> lstOrganizationUserSettings = new List<OrganizationUserSetting>();
                    lstTableSetting.ForEach(x =>
                    {
                        lstOrganizationUserSettings.Add(new OrganizationUserSetting
                        {
                            UserId = ManagerBase.CurrentUserSession.UserId,
                            OrganizationId = ManagerBase.CurrentUserSession.OrganizationId,
                            ColumnSequence = x.Sequence,
                            IsVisible = x.IsVisible,
                            ColumnId = x.ColumnId,
                            CreatedDate = DateTime.UtcNow
                        });
                    });

                    _unitofWork.CommonRepository.AddOrganizationUserSetting(lstOrganizationUserSettings);
                }
                else
                {
                    var data = _unitofWork.CommonRepository.GetOrganizationUserSetting(ManagerBase.CurrentUserSession.OrganizationId, null, Enum.GetName(typeof(ModuleName), ModuleName.Export));
                    if (data.Count > 0)
                    {
                        _unitofWork.CommonRepository.RemoveOrganizationUserSetting(data);
                    }
                    List<OrganizationUserSetting> lstOrganizationUserSettings = new List<OrganizationUserSetting>();
                    lstTableSetting.ForEach(x =>
                    {
                        lstOrganizationUserSettings.Add(new OrganizationUserSetting
                        {
                            OrganizationId = ManagerBase.CurrentUserSession.OrganizationId,
                            ColumnSequence = x.Sequence,
                            IsVisible = x.IsVisible,
                            ColumnId = x.ColumnId,
                            CreatedDate = DateTime.UtcNow
                        });
                    });
                    _unitofWork.CommonRepository.AddOrganizationUserSetting(lstOrganizationUserSettings);
                }
                _unitofWork.Save();
            }

            return true;
        }

        public List<TableSetting> GetDefaultPeopleTableSetting()
        {
            List<TableSetting> lstTableSetting = new List<TableSetting>();

            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                List<OrganizationUserSettingModel> lstOrganizationUserSettings = new List<OrganizationUserSettingModel>();
                if (ManagerBase.CurrentUserSession.IsOrganizationAdmin)
                {
                    lstOrganizationUserSettings = _unitofWork.CommonRepository.GetOrganizationUserSettingModel(ManagerBase.CurrentUserSession.OrganizationId, null, Enum.GetName(typeof(ModuleName), ModuleName.Export));
                }
                else
                {
                    lstOrganizationUserSettings = _unitofWork.CommonRepository.GetOrganizationUserSettingModel(ManagerBase.CurrentUserSession.OrganizationId, ManagerBase.CurrentUserSession.UserId, Enum.GetName(typeof(ModuleName), ModuleName.Export));
                    if (lstOrganizationUserSettings.Count == 0)
                    {
                        lstOrganizationUserSettings = _unitofWork.CommonRepository.GetOrganizationUserSettingModel(ManagerBase.CurrentUserSession.OrganizationId, null, Enum.GetName(typeof(ModuleName), ModuleName.Export));
                    }
                }

                if (lstOrganizationUserSettings.Count > 0)
                {
                    lstOrganizationUserSettings.ForEach(x =>
                    {
                        lstTableSetting.Add(new TableSetting
                        {
                            ColumnName = x.ColumnName,
                            IsVisible = x.IsVisible,
                            Sequence = x.ColumnSequence,
                            ColumnId = x.ColumnId,
                            DisplayName = x.DisplayName

                        });
                    });
                }
            }


            return lstTableSetting;
        }

        public DataTable ToDataTable<T>(List<T> items, List<string> columns)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties by using reflection   
            var Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance).ToList();

            var byOrder = new List<PropertyInfo>();
            columns.ForEach(x =>
            {
                var data = Props.Where(prop => prop.Name == ExportModuleOrderMapping.GetColumnValueByKey(x)).FirstOrDefault();
                if (data != null)
                    byOrder.Add(data);
            });
            Props = byOrder;
            Props = Props.Where(x => x.Name != "Total").ToList();
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names  
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Count];
                for (int i = 0; i < Props.Count; i++)
                {
                    //var s = Props[i].Name;
                    if (Props[i].PropertyType == typeof(DateTime?))
                    {
                        var date = (DateTime?)Props[i].GetValue(item, null);
                        if (date != null)
                        {
                            values[i] = date.GetValueOrDefault().ToString("MM/dd/yy");
                        }
                        else
                        {
                            values[i] = string.Empty;
                        }
                    }
                    else
                    {
                        values[i] = Props[i].GetValue(item, null);
                    }
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }

        public List<ExportReportVm> ExportToExcelPeopleRecordByFilter(ExportReportFilterSetting setting, int organizationId, int start, int length, string SortDir, string SortCol, string search)
        {
            List<ExportReportVm> _PeopleReport = new List<ExportReportVm>();
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {

                DateTime? anniversaryFrom = null;
                DateTime? anniversaryTo = null;

                if (!string.IsNullOrEmpty(setting.AnniversaryFrom))
                {
                    anniversaryFrom = Convert.ToDateTime(setting.AnniversaryFrom);
                }
                if (!string.IsNullOrEmpty(setting.AnniversaryTo))
                {
                    anniversaryTo = Convert.ToDateTime(setting.AnniversaryTo);
                }


                ExportFilterSettingVm filterSetting = new ExportFilterSettingVm
                {
                    GendersSelected = setting.Genders != null ? string.Join(",", setting.Genders) : string.Empty,
                    MaritalStatusSelected = setting.MaritalStatus != null ? string.Join(",", setting.MaritalStatus) : string.Empty,
                    LivingStatusSelected = setting.LivingStatus != null ? string.Join(",", setting.LivingStatus) : string.Empty,
                    TitlesHSelected = setting.TitlesH != null ? string.Join(",", setting.TitlesH) : string.Empty,
                    SuffixHSelected = setting.SuffixH != null ? string.Join(",", setting.SuffixH) : string.Empty,
                    TribeHSelected = setting.TribesH != null ? string.Join(",", setting.TribesH) : string.Empty,
                    TitlesSelected = setting.Titles != null ? string.Join(",", setting.Titles) : string.Empty,
                    TribesSelected = setting.Tribes != null ? string.Join(",", setting.Tribes) : string.Empty,
                    NeighborhoodsSelected = setting.Neighborhoods != null ? string.Join(",", setting.Neighborhoods) : string.Empty,
                    CitySelected = setting.Cities != null ? string.Join(",", setting.Cities) : string.Empty,
                    StatesSelected = setting.States != null ? string.Join(",", setting.States) : string.Empty,
                    ZipSelected = setting.Zip != null ? string.Join(",", setting.Zip) : string.Empty,
                    CountriesSelected = setting.Countries != null ? string.Join(",", setting.Countries) : string.Empty,
                    AnniversaryFrom = anniversaryFrom,
                    AnniversaryTo = anniversaryTo,
                    SortColumn = SortCol,
                    SortDir = SortDir,
                    Start = start,
                    PageSize = length,
                    SearchValue = search
                };
                _PeopleReport = _unitofWork.ExportRepository.ExportToExcelPeopleRecordByFilter(filterSetting, ManagerBase.CurrentUserSession.OrganizationId, SortDir, SortCol, search, start, length).ToList();
            }

            return _PeopleReport;
        }

        public int SaveFilterSetting(ExportFilterSettingVm settingToBeSaved)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var d = _unitofWork.ExportRepository.GetSavedFilterDataByName(settingToBeSaved.FiterSettingName, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                //if (d != null) // same name exists
                //{
                //    // inform the user that this name already exists
                //    return -2;
                //}
                if (settingToBeSaved.FilterId == 0)// a setting is savedwhile no filters were selected
                {
                    //// we need to check if there is any other filter saved with same name
                    //var data = _unitofWork.ExportRepository.GetSavedFilterDataByName(settingToBeSaved.FiterSettingName, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                    //if (data != null) // same name exists
                    //{
                    //    // inform the user that this name already exists
                    //    return -2;
                    //}
                    //else
                    //{ // name is unique
                    ExportFilterSetting FilterSetting = new ExportFilterSetting
                    {
                        City = settingToBeSaved.CitySelected,
                        Country = settingToBeSaved.CountriesSelected,
                        CreatedBy = ManagerBase.CurrentUserSession.UserId,
                        Deceased = settingToBeSaved.LivingStatusSelected,
                        FilterSettingName = settingToBeSaved.FiterSettingName,
                        Gender = settingToBeSaved.GendersSelected,
                        MaritalStatus = settingToBeSaved.MaritalStatusSelected,
                        Neighborhood = settingToBeSaved.NeighborhoodsSelected,
                        State = settingToBeSaved.StatesSelected,
                        SuffixH = settingToBeSaved.SuffixHSelected,
                        Title = settingToBeSaved.TitlesSelected,
                        TitleH = settingToBeSaved.TitlesHSelected,
                        Tribe = settingToBeSaved.TribesSelected,
                        TribeH = settingToBeSaved.TribeHSelected,
                        Zip = settingToBeSaved.ZipSelected,
                        UserId = ManagerBase.CurrentUserSession.UserId,
                        OrganizationId = ManagerBase.CurrentUserSession.OrganizationId,
                        CreatedDate = DateTime.UtcNow,
                        SaveFilterColumnIds = settingToBeSaved.SavedFilterColumnId,
                        SaveFilterGroupTypeColumnIds = settingToBeSaved.SavedFilterGroupTypeColumnId
                    };
                    _unitofWork.ExportRepository.SaveFilterSetting(FilterSetting);
                    _unitofWork.Save();
                    return FilterSetting.FilterSettingId;
                    //}
                }
                else
                {
                    // there are two cases that same name/ different name
                    // if same name then overwrite
                    var data = _unitofWork.ExportRepository.GetSavedFilterDataByName(settingToBeSaved.FiterSettingName, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                    if (data != null)
                    { // we have to overwrite the values
                        //data.ModifiedDate = DateTime.UtcNow;
                        //data.GroupBy = settingToBeSaved.GroupBy;
                        data.City = settingToBeSaved.CitySelected;
                        data.Country = settingToBeSaved.CountriesSelected;
                        data.CreatedBy = ManagerBase.CurrentUserSession.UserId;
                        data.Deceased = settingToBeSaved.LivingStatusSelected;
                        data.FilterSettingName = settingToBeSaved.FiterSettingName;
                        data.Gender = settingToBeSaved.GendersSelected;
                        data.MaritalStatus = settingToBeSaved.MaritalStatusSelected;
                        data.Neighborhood = settingToBeSaved.NeighborhoodsSelected;
                        data.State = settingToBeSaved.StatesSelected;
                        data.SuffixH = settingToBeSaved.SuffixHSelected;
                        data.Title = settingToBeSaved.TitlesSelected;
                        data.TitleH = settingToBeSaved.TitlesHSelected;
                        data.Tribe = settingToBeSaved.TribesSelected;
                        data.TribeH = settingToBeSaved.TribeHSelected;
                        data.Zip = settingToBeSaved.ZipSelected;
                        _unitofWork.Save();
                        return data.FilterSettingId;
                    }
                    else
                    {
                        // new name is not there and we have to make a new entry of it
                        ExportFilterSetting financialReportFilterSetting = new ExportFilterSetting
                        {
                            City = settingToBeSaved.CitySelected,
                            Country = settingToBeSaved.CountriesSelected,
                            CreatedBy = ManagerBase.CurrentUserSession.UserId,
                            Deceased = settingToBeSaved.LivingStatusSelected,
                            FilterSettingName = settingToBeSaved.FiterSettingName,
                            Gender = settingToBeSaved.GendersSelected,
                            MaritalStatus = settingToBeSaved.MaritalStatusSelected,
                            Neighborhood = settingToBeSaved.NeighborhoodsSelected,
                            State = settingToBeSaved.StatesSelected,
                            SuffixH = settingToBeSaved.SuffixHSelected,
                            Title = settingToBeSaved.TitlesSelected,
                            TitleH = settingToBeSaved.TitlesHSelected,
                            Tribe = settingToBeSaved.TribesSelected,
                            TribeH = settingToBeSaved.TribeHSelected,
                            Zip = settingToBeSaved.ZipSelected,
                            UserId = ManagerBase.CurrentUserSession.UserId,
                            OrganizationId = ManagerBase.CurrentUserSession.OrganizationId,
                            CreatedDate = DateTime.UtcNow,
                            SaveFilterGroupTypeColumnIds = settingToBeSaved.SavedFilterGroupTypeColumnId,
                            SaveFilterColumnIds = settingToBeSaved.SavedFilterColumnId

                        };
                        _unitofWork.ExportRepository.SaveFilterSetting(financialReportFilterSetting);
                        _unitofWork.Save();
                        return financialReportFilterSetting.FilterSettingId;
                    }

                }
            }
        }

        public int SaveFilterSettingOverride(ExportFilterSettingVm settingToBeSaved)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                // there are two cases that same name/ different name
                // if same name then overwrite
                var data = _unitofWork.ExportRepository.GetSavedFilterDataByName(settingToBeSaved.FiterSettingName, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                if (data != null)
                { // we have to overwrite the values
                  //data. = DateTime.UtcNow;
                    data.City = settingToBeSaved.CitySelected;
                    data.Country = settingToBeSaved.CountriesSelected;
                    data.CreatedBy = ManagerBase.CurrentUserSession.UserId;
                    data.Deceased = settingToBeSaved.LivingStatusSelected;
                    data.FilterSettingName = settingToBeSaved.FiterSettingName;
                    data.Gender = settingToBeSaved.GendersSelected;
                    data.MaritalStatus = settingToBeSaved.MaritalStatusSelected;
                    data.Neighborhood = settingToBeSaved.NeighborhoodsSelected;
                    data.State = settingToBeSaved.StatesSelected;
                    data.SuffixH = settingToBeSaved.SuffixHSelected;
                    data.Title = settingToBeSaved.TitlesSelected;
                    data.TitleH = settingToBeSaved.TitlesHSelected;
                    data.Tribe = settingToBeSaved.TribesSelected;
                    data.TribeH = settingToBeSaved.TribeHSelected;
                    data.Zip = settingToBeSaved.ZipSelected;
                    data.SaveFilterGroupTypeColumnIds = settingToBeSaved.SavedFilterGroupTypeColumnId;
                    data.SaveFilterColumnIds = settingToBeSaved.SavedFilterColumnId;
                }
                _unitofWork.Save();
                return data.FilterSettingId;
            }

        }

        public ExportFilterSettingVm GetSavedFilterDataById(int filterId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSavedFilterDataById(filterId, ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId);
                if (data != null)
                {
                    ExportFilterSettingVm settingVm = new ExportFilterSettingVm
                    {
                        CitySelected = data.City,
                        CountriesSelected = data.Country,
                        FilterId = data.FilterSettingId,
                        FiterSettingName = data.FilterSettingName,
                        GendersSelected = data.Gender,
                        LivingStatusSelected = data.Deceased,
                        MaritalStatusSelected = data.MaritalStatus,
                        NeighborhoodsSelected = data.Neighborhood,
                        StatesSelected = data.State,
                        SuffixHSelected = data.SuffixH,
                        TitlesHSelected = data.TitleH,
                        TitlesSelected = data.Title,
                        TribeHSelected = data.TribeH,
                        TribesSelected = data.Tribe,
                        ZipSelected = data.Zip,
                        SavedFilterColumnId = data.SaveFilterColumnIds,
                        SavedFilterGroupTypeColumnId = data.SaveFilterGroupTypeColumnIds
                    };
                    return settingVm;
                }
                else return new ExportFilterSettingVm();
            }
        }

        public List<Common.CommonModel.CommonDropDown> GetSavedFiltersByUser()
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSavedFiltersByUserByOrganization(ManagerBase.CurrentUserSession.UserId, ManagerBase.CurrentUserSession.OrganizationId).Select(x => new Common.CommonModel.CommonDropDown
                {
                    Id = x.FilterSettingId,
                    name = x.FilterSettingName,
                }).ToList();
                return data;
            }
        }
        public List<PeopleExportGrouptTypeVm> GetAllSavedGroupTypeColumn()
        {
            EntityModel context = new EntityModel();
            List<PeopleExportGrouptTypeVm> lstPeopleExportGrouptTypeVm = new List<PeopleExportGrouptTypeVm>();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetAllSavedGroupTypeColumnByUserId(ManagerBase.CurrentUserSession.UserId);
                lstPeopleExportGrouptTypeVm = data.Select(x => new PeopleExportGrouptTypeVm
                {
                    SavedFilterGroupTypeColumnId = x.SavedFilterGroupTypeColumnId,
                    FilterName = x.FilterName,
                    PrintNote = x.PrintNote,
                    NotAddColumn = x.NotAddColumn,
                    PersonCriteria = x.PersonCriteria,
                    savedFilterGroupTypeColumnGroupVms = x.SavedFilterGroupTypeColumnGroup.Select(z => new SavedFilterGroupTypeColumnGroupVm
                    {
                        GroupId = z.GroupId
                    }).ToList(),
                    savedFilterGroupTypeColumnNameVms = x.SavedFilterGroupTypeColumnName.Select(z => new SavedFilterGroupTypeColumnNameVm
                    {
                        GroupTypeId = z.GroupTypeId,
                        ColumnName = z.ColumnName
                    }).ToList(),
                }).ToList();
            }
            return lstPeopleExportGrouptTypeVm;
        }
        public bool DeletePeopleExportGroupTypeColumn(int SavedFilterGroupTypeColoumnId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSaveFilterGroupTypeColumnById(SavedFilterGroupTypeColoumnId);
                if (data != null)
                {
                    data.IsDeleted = true;
                    data.DeletedBy = ManagerBase.CurrentUserSession.UserId;
                    data.DeletedDate = DateTime.UtcNow;
                    _unitofWork.Save();
                }
                return true;
            }
        }
        public PeopleExportGrouptTypeVm GetSavedGroupTypeColumnValues(int SavedFilterGroupTypeColumnId)
        {
            EntityModel context = new EntityModel();
            PeopleExportGrouptTypeVm peopleExportGrouptTypeVm = new PeopleExportGrouptTypeVm();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetSaveFilterGroupTypeColumnById(SavedFilterGroupTypeColumnId);
                if (data != null)
                {
                    peopleExportGrouptTypeVm.SavedFilterGroupTypeColumnId = data.SavedFilterGroupTypeColumnId;
                    peopleExportGrouptTypeVm.FilterName = data.FilterName;
                    //peopleExportGrouptTypeVm.GroupTypeId = data.GroupTypeId;
                    //peopleExportGrouptTypeVm.GroupId = data.GroupId;
                    peopleExportGrouptTypeVm.PrintNote = data.PrintNote;
                    peopleExportGrouptTypeVm.NotAddColumn = data.NotAddColumn;
                    peopleExportGrouptTypeVm.PersonCriteria = data.PersonCriteria;
                    peopleExportGrouptTypeVm.savedFilterGroupTypeColumnGroupVms = data.SavedFilterGroupTypeColumnGroup.Select(x => new SavedFilterGroupTypeColumnGroupVm
                    {
                        GroupId = x.GroupId
                    }).ToList();
                    peopleExportGrouptTypeVm.savedFilterGroupTypeColumnNameVms = data.SavedFilterGroupTypeColumnName.Select(x => new SavedFilterGroupTypeColumnNameVm
                    {
                        GroupTypeId = x.GroupTypeId,
                        ColumnName = x.ColumnName
                    }).ToList();
                }
                return peopleExportGrouptTypeVm;
            }
        }
        public ExportFilterSettingFinancialColumnVm GetExportFilterSettingsforFinancialColumnByColumnFilterid(int columnId, int filterId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetExportFilterSettingsForFinancialColumnByColumnId(columnId, filterId);
                ExportFilterSettingFinancialColumnVm exportFilterSettingFinancialColumnVm = new ExportFilterSettingFinancialColumnVm();
                if (data != null)
                {
                    exportFilterSettingFinancialColumnVm.ColumnId = data.ColumnId;
                    exportFilterSettingFinancialColumnVm.FilterSettingId = data.FilterSettingId;
                    exportFilterSettingFinancialColumnVm.PersonCriteria = data.PersonCriteria;

                }
                return exportFilterSettingFinancialColumnVm;
            }
        }
        public ExportFilterSettingGroupTypeColumnVm GetExportFilterSettingsforGroupColumnByColumnFilterid(int GroupTypeColumnId, int filterId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetExportFilterSettingsForGroupColumnByColumnId(GroupTypeColumnId, filterId);
                ExportFilterSettingGroupTypeColumnVm exportFilterSettingGroupTypeColumnVm = new ExportFilterSettingGroupTypeColumnVm();
                if (data != null)
                {
                    exportFilterSettingGroupTypeColumnVm.GroupTypeColumnId = data.GroupTypeColumnId;
                    exportFilterSettingGroupTypeColumnVm.FilterSettingId = data.FilterSettingId;
                    exportFilterSettingGroupTypeColumnVm.PersonCriteria = data.PersonCriteria;
                    exportFilterSettingGroupTypeColumnVm.NotAddColumn = data.NotAddColumn;
                    exportFilterSettingGroupTypeColumnVm.PrintGroupNote = data.PrintGroupNote;
                }
                return exportFilterSettingGroupTypeColumnVm;
            }
        }

        public void SaveExportFilterSettingFinancialColumn(PersonCriteriaFinancialVm personCriteriaFinancialVm, int filterId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetExportFilterSettingsForFinancialColumnByColumnId(personCriteriaFinancialVm.ColumnId, filterId);
                if (data != null)
                {
                    _unitofWork.ExportRepository.DeleteAlreadyExistingCriteriaForColumn(data);
                    _unitofWork.Save();
                }

                ExportFilterSettingFinancialColumn exportFilterSettingFinancialColumn = new ExportFilterSettingFinancialColumn();
                exportFilterSettingFinancialColumn.ColumnId = personCriteriaFinancialVm.ColumnId;
                exportFilterSettingFinancialColumn.PersonCriteria = personCriteriaFinancialVm.PersonCriteria;
                exportFilterSettingFinancialColumn.FilterSettingId = filterId;
                _unitofWork.ExportRepository.SaveExportFilterSettingFinancialColumn(exportFilterSettingFinancialColumn);
                _unitofWork.Save();

            }
        }
        public void DeleteAlreadyExistingCriteriaForColumn(ExportFilterSettingFinancialColumn exportFilterSettingFinancialColumn)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                _unitofWork.ExportRepository.DeleteAlreadyExistingCriteriaForColumn(exportFilterSettingFinancialColumn);
                _unitofWork.Save();
            }
        }
        public void SaveExportFilterSettingGroupTypeColumn(PersonCriteriaGroupTypeVm personCriteriaGroupTypeVm, int filterId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetExportFilterSettingsForGroupColumnByColumnId(personCriteriaGroupTypeVm.GroupTypeColumnId, filterId);
                if (data != null)
                {
                    _unitofWork.ExportRepository.DeleteAlreadyExistingCriteriaForGroupColumn(data);
                    _unitofWork.Save();
                    //DeleteAlreadyExistingCriteriaForGroupColumn(data);
                }
                ExportFilterSettingGroupTypeColumn exportFilterSettingGroupTypeColumn = new ExportFilterSettingGroupTypeColumn();
                exportFilterSettingGroupTypeColumn.GroupTypeColumnId = personCriteriaGroupTypeVm.GroupTypeColumnId;
                exportFilterSettingGroupTypeColumn.PersonCriteria = personCriteriaGroupTypeVm.PersonCriteria;
                exportFilterSettingGroupTypeColumn.NotAddColumn = personCriteriaGroupTypeVm.NotAddColumn == 1 ? true : false;
                exportFilterSettingGroupTypeColumn.PrintGroupNote = personCriteriaGroupTypeVm.PrintGroupNote == 1 ? true : false;
                exportFilterSettingGroupTypeColumn.FilterSettingId = filterId;
                _unitofWork.ExportRepository.SaveExportFilterSettingGroupTypeColumn(exportFilterSettingGroupTypeColumn);
                _unitofWork.Save();
            }
        }
        public void DeleteAlreadyExistingCriteriaForGroupColumn(ExportFilterSettingGroupTypeColumn exportFilterSettingGroupTypeColumn)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                _unitofWork.ExportRepository.DeleteAlreadyExistingCriteriaForGroupColumn(exportFilterSettingGroupTypeColumn);
                _unitofWork.Save();
            }
        }
        public bool GetFilterDatabyGroupTypeColumnId(int GroupTypeColumnId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var data = _unitofWork.ExportRepository.GetFilterDatabyGroupTypeColumnId(GroupTypeColumnId);
                if (data.Count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }

        public List<object> GetColumnsForFilter(string financialColumnIds, string GroupColumnIds,int ExportFilterId)
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                List<object> combinedList = new List<object>();
                List<SavedFilterColumnVM> financialsColumnsList = new List<SavedFilterColumnVM>();
                List<PeopleExportGrouptTypeVm> groupColumnList = new List<PeopleExportGrouptTypeVm>();
                if (financialColumnIds != null)
                {
                    var FinancialCols = financialColumnIds.Split(',');
                    foreach (var colId in FinancialCols)
                    {
                        var col = _unitofWork.ExportRepository.GetFinancialColumnById(Convert.ToInt32(colId), ManagerBase.CurrentUserSession.UserId);
                        if (col != null)
                        {
                            SavedFilterColumnVM savedFilterColumnVM = new SavedFilterColumnVM();
                            savedFilterColumnVM.AmountMax = col.AmountMax;
                            savedFilterColumnVM.AmountMin = col.AmountMin;
                            savedFilterColumnVM.CampaignSelected = col.CampaignSelected;
                            savedFilterColumnVM.CategorySelected = col.CategorySelected;
                            savedFilterColumnVM.ColumnId = col.ColumnId;
                            savedFilterColumnVM.ColumnName = col.ColumnName;
                            savedFilterColumnVM.Description = col.Description;
                            savedFilterColumnVM.DescColumns = col.DescColumns;
                            savedFilterColumnVM.Event1Selected = col.Event1Selected;
                            savedFilterColumnVM.Event2Selected = col.Event2Selected;
                            savedFilterColumnVM.FilterFor = col.FilterFor;
                            savedFilterColumnVM.FromDate = col.FromDate;
                            savedFilterColumnVM.Honoree1Selected = col.Honoree1Selected;
                            savedFilterColumnVM.Honoree2Selected = col.Honoree2Selected;
                            savedFilterColumnVM.Neighborhood = col.Neighborhood;
                            savedFilterColumnVM.PaymentBy = col.PaymentBy;
                            savedFilterColumnVM.PledgeBy = col.PledgeBy;
                            savedFilterColumnVM.PledgeTypeSelected = col.PledgeTypeSelected;
                            savedFilterColumnVM.SelectBy = col.SelectBy;
                            savedFilterColumnVM.Solicitor1Selected = col.Solicitor1Selected;
                            savedFilterColumnVM.Solicitor2Selected = col.Solicitor2Selected;
                            savedFilterColumnVM.Solicitor3Selected = col.Solicitor3Selected;
                            savedFilterColumnVM.Solicitor4Selected = col.Solicitor4Selected;
                            savedFilterColumnVM.ToDate = col.ToDate;
                            savedFilterColumnVM.PersonCriteria = GetExportFilterSettingsforFinancialColumnByColumnFilterid(col.ColumnId, Convert.ToInt32(ExportFilterId)).PersonCriteria;
                            savedFilterColumnVM.YearSelected = col.YearSelected;
                            financialsColumnsList.Add(savedFilterColumnVM);
                        }
                    }                   
                    
                }
                if (GroupColumnIds != null)
                {
                    
                    var groupCols = GroupColumnIds.Split(',');
                    foreach (var colId in groupCols)
                    {
                        var x = _unitofWork.ExportRepository.GetGroupColumnById(Convert.ToInt32(colId), ManagerBase.CurrentUserSession.UserId);                     
                       
                        PeopleExportGrouptTypeVm savedFilterGroupTypeColumnVM = new PeopleExportGrouptTypeVm();
                        if (x != null)
                        {
                            savedFilterGroupTypeColumnVM.SavedFilterGroupTypeColumnId = x.SavedFilterGroupTypeColumnId;
                            savedFilterGroupTypeColumnVM.FilterName = x.FilterName;
                            var anotherData = GetExportFilterSettingsforGroupColumnByColumnFilterid(x.SavedFilterGroupTypeColumnId, Convert.ToInt32(ExportFilterId));
                            savedFilterGroupTypeColumnVM.NotAddColumn = anotherData.NotAddColumn;
                            savedFilterGroupTypeColumnVM.PersonCriteria = anotherData.PersonCriteria;
                            savedFilterGroupTypeColumnVM.PrintNote = anotherData.PrintGroupNote;
                            savedFilterGroupTypeColumnVM.savedFilterGroupTypeColumnGroupVms = x.SavedFilterGroupTypeColumnGroup.Select(z => new SavedFilterGroupTypeColumnGroupVm
                            {
                                GroupId = z.GroupId
                            }).ToList();
                            savedFilterGroupTypeColumnVM.savedFilterGroupTypeColumnNameVms = x.SavedFilterGroupTypeColumnName.Select(z => new SavedFilterGroupTypeColumnNameVm
                            {
                                GroupTypeId = z.GroupTypeId,
                                ColumnName = z.ColumnName
                            }).ToList();


                            groupColumnList.Add(savedFilterGroupTypeColumnVM);
                        }
                    }
                   
                }
                combinedList.Add(financialsColumnsList);
                combinedList.Add(groupColumnList);
                return combinedList;
            }

        }
        public List<List<object>> GetSavedFiltersByUserId()
        {
            EntityModel context = new EntityModel();
            using (IUnitofWork _unitofWork = new UnitOfWork(context))
            {
                var allFilters = _unitofWork.ExportRepository.GetAllSavedFiltersByUserId(ManagerBase.CurrentUserSession.UserId);
               
                List<List<object>> allFilteredData = new List<List<object>>();
                foreach(var filter in allFilters)
                {
                    List<object> FilterData = new List<object>();
                    FilterData.Add(filter);
                    var FilteredData=GetColumnsForFilter(filter.SaveFilterColumnIds, filter.SaveFilterGroupTypeColumnIds, filter.FilterSettingId);
                    FilterData.Add(FilteredData);
                    allFilteredData.Add(FilterData);

                }
                return allFilteredData;


            }
        }

            /* public List<PeopleExportGrouptTypeVm> GetAllSavedGroupTypeColumnByFilterId(int? filterId)
             {
                 EntityModel context = new EntityModel();
                 List<PeopleExportGrouptTypeVm> lstPeopleExportGrouptTypeVm = new List<PeopleExportGrouptTypeVm>();
                 using (IUnitofWork _unitofWork = new UnitOfWork(context))
                 {
                     var data = _unitofWork.ExportRepository.GetAllSavedGroupTypeColumnByUserIdAndFilterId(ManagerBase.CurrentUserSession.UserId, filterId);
                     lstPeopleExportGrouptTypeVm = data.Select(x => new PeopleExportGrouptTypeVm
                     {
                         SavedFilterGroupTypeColumnId = x.SavedFilterGroupTypeColumnId,
                         FilterName = x.FilterName,
                         PrintNote = x.PrintNote,
                         NotAddColumn = x.NotAddColumn,
                         PersonCriteria = x.PersonCriteria,
                         savedFilterGroupTypeColumnGroupVms = x.SavedFilterGroupTypeColumnGroup.Select(z => new SavedFilterGroupTypeColumnGroupVm
                         {
                             GroupId = z.GroupId
                         }).ToList(),
                         savedFilterGroupTypeColumnNameVms = x.SavedFilterGroupTypeColumnName.Select(z => new SavedFilterGroupTypeColumnNameVm
                         {
                             GroupTypeId = z.GroupTypeId,
                             ColumnName = z.ColumnName
                         }).ToList(),
                     }).ToList();
                 }
                 return lstPeopleExportGrouptTypeVm;
             }
             public List<SavedFilterColumnVM> GetSavedColumnsByFilterId(int? filterId)
             {
                 EntityModel context = new EntityModel();
                 using (IUnitofWork _unitofWork = new UnitOfWork(context))
                 {
                     var data = _unitofWork.ExportRepository.GetSavedColumnsByUserAndFilterId(ManagerBase.CurrentUserSession.UserId,filterId).Select(col => new SavedFilterColumnVM
                     {
                         AmountMax = col.AmountMax,
                         AmountMin = col.AmountMin,
                         CampaignSelected = col.CampaignSelected,
                         CategorySelected = col.CategorySelected,
                         ColumnId = col.ColumnId,
                         ColumnName = col.ColumnName,
                         Description = col.Description,
                         DescColumns = col.DescColumns,
                         Event1Selected = col.Event1Selected,
                         Event2Selected = col.Event2Selected,
                         FilterFor = col.FilterFor,
                         FromDate = col.FromDate,
                         Honoree1Selected = col.Honoree1Selected,
                         Honoree2Selected = col.Honoree2Selected,
                         Neighborhood = col.Neighborhood,
                         PaymentBy = col.PaymentBy,
                         PledgeBy = col.PledgeBy,
                         PledgeTypeSelected = col.PledgeTypeSelected,
                         SelectBy = col.SelectBy,
                         Solicitor1Selected = col.Solicitor1Selected,
                         Solicitor2Selected = col.Solicitor2Selected,
                         Solicitor3Selected = col.Solicitor3Selected,
                         Solicitor4Selected = col.Solicitor4Selected,
                         ToDate = col.ToDate,
                         PersonCriteria = col.PersonCriteria,
                         YearSelected = col.YearSelected
                     }).ToList();

                     return data;
                 }
             }*/

        }
}
