using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AspNetIdentity2ExtendingUsersAndRoles.Models;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.Api
{
    public class testController : Controller
    {
        private test13Entities db = new test13Entities();

        // GET: /Api/test/
        public ActionResult Index()
        {
            var oils = db.Oils.Include(o => o.OilMakerCompany);
            //return View(oils.ToList());
            return null;
        }

        // GET: /Api/test/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Models.Oil oil = db.Oils.Find(id);
            if (oil == null)
            {
                return HttpNotFound();
            }
            //return View(oil);
            return null;
        }

        // GET: /Api/test/Create
        public ActionResult Create()
        {
            ViewBag.OilMakerId = new SelectList(db.OilMakerCompanies, "OilMakerId", "OilMakerName");
            //return View();
            return null;
        }

        // POST: /Api/test/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="OilId,OilName,OilMakerId,OilAverageMilage,OilPower,OilPrice,OilDescription,OilNetWeightId")] Models.Oil oil)
        {
            if (ModelState.IsValid)
            {
                db.Oils.Add(oil);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.OilMakerId = new SelectList(db.OilMakerCompanies, "OilMakerId", "OilMakerName", oil.OilMakerId);
            //return View(oil);
            return null;
        }

        // GET: /Api/test/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Models.Oil oil = db.Oils.Find(id);
            if (oil == null)
            {
                return HttpNotFound();
            }
            ViewBag.OilMakerId = new SelectList(db.OilMakerCompanies, "OilMakerId", "OilMakerName", oil.OilMakerId);
            //return View(oil);
            return null;
        }

        // POST: /Api/test/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "OilId,OilName,OilMakerId,OilAverageMilage,OilPower,OilPrice,OilDescription,OilNetWeightId")] Models.Oil oil)
        {
            if (ModelState.IsValid)
            {
                db.Entry(oil).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.OilMakerId = new SelectList(db.OilMakerCompanies, "OilMakerId", "OilMakerName", oil.OilMakerId);
            //return View(oil);
            return null;
        }

        // GET: /Api/test/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Models.Oil oil = db.Oils.Find(id);
            if (oil == null)
            {
                return HttpNotFound();
            }
            //return View(oil);
            return null;
        }

        // POST: /Api/test/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Models.Oil oil = db.Oils.Find(id);
            db.Oils.Remove(oil);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
