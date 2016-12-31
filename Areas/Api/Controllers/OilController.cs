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
    public class OilController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.Oil> DbSet
        {
            get { return db.Oils; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public OilResponse Get([FromUri] OilSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.Oil, bool>> query =
                s => (!request.OilId.HasValue || s.OilId == request.OilId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.OilName.Contains(request.SearchString)) &&
                     (request.OilMakerCompany == null || s.OilMakerId == request.OilMakerCompany);
            IEnumerable<Models.Oil> oils = request.IsAsc ? DbSet.Where(query).Include("OilMakerCompany")
                                            .OrderBy(oil => oil.OilId).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).Include("OilMakerCompany")
                                                .OrderByDescending(oil => oil.OilId).Skip(fromRow).Take(toRow).ToList();
            return new OilResponse { Oils = oils, TotalCount = DbSet.Count(query) };

        }

        //[ApiException]
        [HttpPost]
        public Models.Oil Post(Models.Oil oil)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (oil.OilId > 0)
            {
                #region Update Record
                Models.Oil oilDbVersion = GetOilById(oil.OilId);
                oilDbVersion.OilName = oil.OilName;
                oilDbVersion.OilMakerId = oil.OilMakerId;
                oilDbVersion.OilAverageMilage = oil.OilAverageMilage;
                oilDbVersion.OilPower = oil.OilPower;
                oilDbVersion.OilPrice = oil.OilPrice;
                oilDbVersion.OilDescription = oil.OilDescription;
                oilDbVersion.OilNetWeightId = oil.OilNetWeightId;
                DbSet.AddOrUpdate(oilDbVersion);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(oil);
                db.SaveChanges();

                #endregion
            }
            return GetOilById(oil.OilId);
        }

        public Models.Oil GetOilById(int id)
        {
            if (id > 0)
            {
                return DbSet.Include("OilMakerCompany").FirstOrDefault(x => x.OilId == id);
            }
            return null;
        }
    }
}