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
    public class BrakeOilController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.BrakeOil> DbSet
        {
            get { return db.BrakeOils; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public BrakeOilResponse Get([FromUri] BrakeOilSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.BrakeOil, bool>> query =
                s => (!request.BrakeOilId.HasValue || s.BrakeOilId == request.BrakeOilId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.BrakeOilName.Contains(request.SearchString));

            IEnumerable<Models.BrakeOil> brakeOils = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(brakeOil => brakeOil.BrakeOilId).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(brakeOil => brakeOil.BrakeOilId).Skip(fromRow).Take(toRow).ToList();
            return new BrakeOilResponse { BrakeOils = brakeOils, TotalCount = DbSet.Count(query) };

        }

        public Models.BrakeOil GetBrakeOilById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.BrakeOilId == id);
            }
            return null;
        }
        //[ApiException]
        [HttpPost]
        public Models.BrakeOil Post(Models.BrakeOil brakeOil)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (brakeOil.BrakeOilId > 0)
            {
                #region Update Record
                Models.BrakeOil dbVersion = GetBrakeOilById(brakeOil.BrakeOilId);
                dbVersion.BrakeOilName = brakeOil.BrakeOilName;
                dbVersion.BrakeOilPrice = brakeOil.BrakeOilPrice;
                DbSet.AddOrUpdate(brakeOil);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(brakeOil);
                db.SaveChanges();

                #endregion
            }
            return GetBrakeOilById(brakeOil.BrakeOilId);
        }
    }
}