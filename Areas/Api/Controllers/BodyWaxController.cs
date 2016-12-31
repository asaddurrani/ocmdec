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
    public class BodyWaxController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.BodyWax> DbSet
        {
            get { return db.BodyWaxes; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public BodyWaxResponse Get([FromUri] BodyWaxSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.BodyWax, bool>> query =
                s => (!request.BodyWaxId.HasValue || s.Id == request.BodyWaxId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.Name.Contains(request.SearchString));

            IEnumerable<Models.BodyWax> bodyWaxs = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(bodyWax => bodyWax.Id).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(bodyWax => bodyWax.Id).Skip(fromRow).Take(toRow).ToList();
            return new BodyWaxResponse { BodyWaxs = bodyWaxs, TotalCount = DbSet.Count(query) };

        }

        public Models.BodyWax GetBodyWaxById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.Id == id);
            }
            return null;
        }
        //[ApiException]
        [HttpPost]
        public Models.BodyWax Post(Models.BodyWax bodyWax)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (bodyWax.Id > 0)
            {
                #region Update Record
                Models.BodyWax dbVersion = GetBodyWaxById(bodyWax.Id);
                dbVersion.Name = bodyWax.Name;
                dbVersion.Price = bodyWax.Price;
                DbSet.AddOrUpdate(dbVersion);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(bodyWax);
                db.SaveChanges();

                #endregion
            }
            return GetBodyWaxById(bodyWax.Id);
        }
    }
}