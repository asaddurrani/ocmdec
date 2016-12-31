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
    public class BodyPolishController : ApiController
    {
        private test13Entities db = new test13Entities();
        protected IDbSet<Models.BodyPolish> DbSet
        {
            get { return db.BodyPolishes; }
        }


        /// <summary>
        /// Get All
        /// </summary>
        public BodyPolishResponse Get([FromUri] BodyPolishSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }

            int fromRow = (request.PageNo - 1) * request.PageSize;
            int toRow = request.PageSize;
            Expression<Func<Models.BodyPolish, bool>> query =
                s => (!request.BodyPolishId.HasValue || s.Id == request.BodyPolishId) &&
                     (string.IsNullOrEmpty(request.SearchString) || s.Name.Contains(request.SearchString));

            IEnumerable<Models.BodyPolish> bodyPolishes = request.IsAsc ? DbSet.Where(query)
                                            .OrderBy(bodyPolish => bodyPolish.Id).Skip(fromRow).Take(toRow).ToList()
                                            : DbSet.Where(query).OrderByDescending(bodyPolish => bodyPolish.Id).Skip(fromRow).Take(toRow).ToList();
            return new BodyPolishResponse { bodyPolishes = bodyPolishes, TotalCount = DbSet.Count(query) };

        }

        public Models.BodyPolish GetBodyPolishesById(int id)
        {
            if (id > 0)
            {
                return DbSet.FirstOrDefault(x => x.Id == id);
            }
            return null;
        }
        //[ApiException]
        [HttpPost]
        public Models.BodyPolish Post(Models.BodyPolish bodyPolish)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            if (bodyPolish.Id > 0)
            {
                #region Update Record
                Models.BodyPolish dbVersion = GetBodyPolishesById(bodyPolish.Id);
                dbVersion.Name = bodyPolish.Name;
                dbVersion.Price = bodyPolish.Price;
                DbSet.AddOrUpdate(dbVersion);
                db.SaveChanges();

                #endregion
            }
            else
            {
                #region Add New Record

                DbSet.Add(bodyPolish);
                db.SaveChanges();

                #endregion
            }
            return GetBodyPolishesById(bodyPolish.Id);
        }
    }
}