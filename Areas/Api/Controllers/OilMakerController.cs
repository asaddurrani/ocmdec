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
    public class OilMakerCompanyController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.OilMakerCompany> DbSet
        {
            get { return db.OilMakerCompanies; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public OilMakerCompanResponse Get([FromUri] OilMakerCompanySearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.OilMakerCompany, bool>> query =
                s => (!request.OilMakerCompanyId.HasValue || s.OilMakerCompanyId == request.OilMakerCompanyId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.OilMakerCompanyName.Contains(request.SearchString));

            IEnumerable<Models.OilMakerCompany> oilFilters = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(oilFilter => oilFilter.OilMakerCompanyId).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(oilFilter => oilFilter.OilMakerCompanyId).Skip(fromRow).Take(toRow).ToList();
            return new OilMakerCompanyResponse { OilMakerCompanys = oilFilters, TotalCount = DbSet.Count(query) };

        }

        public Models.OilMakerCompany GetOilMakerCompanyById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.OilMakerCompanyId == id);
            }
            return null;
        }
        //[ApiException]
        [HttpPost]
        public Models.OilMakerCompany Post(Models.OilMakerCompany oilFilter)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (oilFilter.OilMakerCompanyId > 0)
            {
                #region Update Record
                Models.OilMakerCompany oilFilterDbVersion = GetOilMakerCompanyById(oilFilter.OilMakerCompanyId);
                oilFilterDbVersion.OilMakerCompanyName = oilFilter.OilMakerCompanyName;
                oilFilterDbVersion.OilMakerCompanyPrice = oilFilter.OilMakerCompanyPrice;
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
            return GetOilMakerCompanyById(oilFilter.OilMakerCompanyId);
        }
    }
}