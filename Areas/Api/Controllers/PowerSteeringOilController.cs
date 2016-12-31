using System;
using System.Net;
using System.Web;
using System.Web.Http;
using Interfaces.IServices;
using IstMvcFramework.ModelMappers;
using IstMvcFramework.Models;
using IstMvcFramework.Models.Response;
using MainDomain = Models.RequestModels;


namespace IstMvcFramework.Areas.Api.Controllers
{
    public class PowerSteeringOilController : ApiController
    {
         private readonly IPowerSteeringOilService _powerSteeringOilService;
         public PowerSteeringOilController(IPowerSteeringOilService powerSteeringOilService)
        {
            _powerSteeringOilService = powerSteeringOilService;
            if (powerSteeringOilService == null)
            {
                throw new ArgumentNullException("powerSteeringOilService");
            }

             this._powerSteeringOilService = powerSteeringOilService;
        }
        /// <summary>
        /// Get All
        /// </summary>
         public PowerSteeringOilResponse Get([FromUri] MainDomain.PowerSteeringOilSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            return _powerSteeringOilService.GetAllPowerSterringOils().CreateFrom();
        }

        //[ApiException]
        [HttpPost]
        public Models.PowerSterringOil Post(Models.PowerSterringOil oil)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            return _powerSteeringOilService.Save(oil.CreateFrom()).CreateFrom();
        }
	}
}