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
    public class AirFilterController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.AirFilter> DbSet
        {
            get { return db.AirFilters; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public AirFilterResponse Get([FromUri] AirFilterRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.AirFilter, bool>> query =
                s => (!request.AirFilterId.HasValue || s.AilFilterId == request.AirFilterId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.AirFilterName.Contains(request.SearchString));

            IEnumerable<Models.AirFilter> airFilters = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(airFilter => airFilter.AilFilterId).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(airFilter => airFilter.AilFilterId).Skip(fromRow).Take(toRow).ToList();
            return new AirFilterResponse { AirFilters= airFilters, TotalCount = DbSet.Count(query) };

        }

        //[ApiException]
        [HttpPost]
        public Models.AirFilter Post(Models.AirFilter airFilter)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (airFilter.AilFilterId > 0)
            {
                #region Update Record
                Models.AirFilter airFilterDbVersion = GetAirFilterById(airFilter.AilFilterId);
                airFilterDbVersion.AirFilterName = airFilter.AirFilterName;
                airFilterDbVersion.AirFilterPrice= airFilter.AirFilterPrice;
                DbSet.AddOrUpdate(airFilterDbVersion);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(airFilter);
                db.SaveChanges();

                #endregion
            }
            return GetAirFilterById(airFilter.AilFilterId);
        }

        public Models.AirFilter GetAirFilterById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.AilFilterId== id);
            }
            return null;
        }
    }
}