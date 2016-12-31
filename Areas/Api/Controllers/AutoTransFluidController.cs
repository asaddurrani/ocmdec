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
    public class AutoTransFluidController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.AutoTransFuel> DbSet
        {
            get { return db.AutoTransFuels; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public AutoTransFluidResponse Get([FromUri] AutoTransFluidRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.AutoTransFuel, bool>> query =
                s => (!request.AutoTransFluidId.HasValue || s.Id == request.AutoTransFluidId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.Name.Contains(request.SearchString));

            IEnumerable<Models.AutoTransFuel> autoTransFluids = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(autoTransFluid => autoTransFluid.Id).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(autoTransFluid => autoTransFluid.Id).Skip(fromRow).Take(toRow).ToList();
            return new AutoTransFluidResponse { AutoTransFluids = autoTransFluids, TotalCount = DbSet.Count(query) };

        }

        //[ApiException]
        [HttpPost]
        public Models.AutoTransFuel Post(Models.AutoTransFuel autoTransFuel)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (autoTransFuel.Id > 0)
            {
                #region Update Record
                Models.AutoTransFuel autoTransFuelDbVersion = GetAutoTransFluidById(autoTransFuel.Id);
                autoTransFuelDbVersion.Name = autoTransFuel.Name;
                autoTransFuelDbVersion.BrandName = autoTransFuel.BrandName;
                autoTransFuelDbVersion.Description = autoTransFuel.Description;
                autoTransFuelDbVersion.Quantity = autoTransFuel.Quantity;
                autoTransFuelDbVersion.Price = autoTransFuel.Price;
                autoTransFuelDbVersion.Type= autoTransFuel.Type;
                autoTransFuelDbVersion.UpdatedDate = DateTime.Now;

                DbSet.AddOrUpdate(autoTransFuelDbVersion);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(autoTransFuel);
                db.SaveChanges();

                #endregion
            }
            return GetAutoTransFluidById(autoTransFuel.Id);
        }

        public Models.AutoTransFuel GetAutoTransFluidById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.Id == id);
            }
            return null;
        }
    }
}