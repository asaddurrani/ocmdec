using System;
using System.Net;
using System.Web;
using System.Web.Http;
using Interfaces.IServices;
using IstMvcFramework.ModelMappers;
using IstMvcFramework.Models;
using MainDomain = Models.RequestModels;
using VehicleMakerResponse = IstMvcFramework.Models.Response.VehicleMakerResponse;

namespace IstMvcFramework.Areas.Api.Controllers
{
    public class VehicleMakerController : ApiController
    {
        private readonly IVehicleMakerService _vehicleMakerService;

        /// <summary>
        /// Constructor
        /// </summary>
        public VehicleMakerController(IVehicleMakerService vehicleMakerService)
        {
            if (vehicleMakerService == null)
            {
                throw new ArgumentNullException("vehicleMakerService");
            }

            this._vehicleMakerService = vehicleMakerService;
        }

        /// <summary>
        /// Get All
        /// </summary>
        public VehicleMakerResponse Get([FromUri] MainDomain.VehicleModelMakerSearchRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                throw new HttpException((int)HttpStatusCode.BadRequest, "Invalid Request");
            }
            return _vehicleMakerService.GetAllVehicleMakers().CreateFrom();
        }

        /// <summary>
        /// Get Products
        /// </summary>
        public Models.VehicleMaker Get(int id)
        {

            return _vehicleMakerService.GetVehicleById(id).CreateFrom();
        }
    }
}