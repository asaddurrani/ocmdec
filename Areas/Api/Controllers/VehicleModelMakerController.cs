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
    public class VehicleModelMakerController : ApiController
    {
        private readonly IVehicleModelMakerService _vehicleModelMakerService;
        
        /// <summary>
        /// Constructor
        /// </summary>
        public VehicleModelMakerController(IVehicleModelMakerService vehicleModelMakerService)
        {
            if (vehicleModelMakerService == null)
            {
                throw new ArgumentNullException("vehicleModelMakerService");
            }

            this._vehicleModelMakerService = vehicleModelMakerService;
        }

        /// <summary>
        /// Get All
        /// </summary>
        public VehicleModelMakerResponse Get([FromUri] MainDomain.VehicleModelMakerSearchRequest request)
        {
            return _vehicleModelMakerService.GetAllVehicleModelMakers(request).CreateFrom();
        }

        /// <summary>
        /// Get Products
        /// </summary>
        public Models.VehicleModelMaker Get(int id)
        {

            return _vehicleModelMakerService.GetVehicleModelMakerById(id).CreateFrom();
        }
	}

}