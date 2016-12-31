using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Web;
using System.Web.Http;
using AspNetIdentity2ExtendingUsersAndRoles.Models;
using AspNetIdentity2ExtendingUsersAndRoles.Models.RequesModel;
using AspNetIdentity2ExtendingUsersAndRoles.Models.ResponseModel;


namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.Api.Controllers
{
    public class OilFilterMakerController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.OilFilterMakerCompany> DbSet
        {
            get { return db.OilFilterMakerCompanies; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public oILFILResponse Get([FromUri] OilFilterSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.OilFilter, bool>> query =
                s => (!request.OilFilterId.HasValue || s.OilFilterId == request.OilFilterId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.OilFilterName.Contains(request.SearchString));

            IEnumerable<Models.OilFilter> oilFilters = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(oilFilter => oilFilter.OilFilterId).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(oilFilter => oilFilter.OilFilterId).Skip(fromRow).Take(toRow).ToList();
            return new OilFilterResponse { OilFilters = oilFilters, TotalCount = DbSet.Count(query) };

        }

        public Models.OilFilter GetOilFilterById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.OilFilterId == id);
            }
            return null;
        }
        //[ApiException]
        [HttpPost]
        public Models.OilFilter Post(Models.OilFilter oilFilter)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (oilFilter.OilFilterId > 0)
            {
                #region Update Record
                Models.OilFilter oilFilterDbVersion = GetOilFilterById(oilFilter.OilFilterId);
                oilFilterDbVersion.OilFilterName = oilFilter.OilFilterName;
                oilFilterDbVersion.OilFilterPrice = oilFilter.OilFilterPrice;
                DbSet.AddOrUpdate(oilFilterDbVersion);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(oilFilter);
                db.SaveChanges();

                #endregion
            }
            return GetOilFilterById(oilFilter.OilFilterId);
        }
    }
}