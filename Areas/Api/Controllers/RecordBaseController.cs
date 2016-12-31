using System;
using System.Linq;
using System.Web.Http;
using Interfaces.IServices;
using IstMvcFramework.ModelMappers;
using IstMvcFramework.Models;
using MainDomain = Models.RequestModels;

namespace IstMvcFramework.Areas.Api.Controllers
{
    public class RecordBaseController : ApiController
    {
        private readonly IOilService _oilService;
        private readonly IOilMakerService _oilMakerService;
        private readonly IVehicleMakerService _vehicleMakerService;
        private readonly IVehicleModelMakerService _vehicleModelMakerService;
        private readonly IAirFilterService _airFilterService;
        private readonly IOilFilterService _oilFilterService;
        private readonly IBrakeOilService _brakeOilService;
        private readonly IPowerSteeringOilService _powerSteeringOilService;
        public RecordBaseController(IOilService oilService, IOilMakerService oilMakerService, IVehicleMakerService vehicleMakerService, IVehicleModelMakerService vehicleModelMakerService, IAirFilterService airFilterService, IOilFilterService oilFilterService, IBrakeOilService brakeOilService, IPowerSteeringOilService powerSteeringOilService)
        {
            if (oilService == null)
            {
                throw new ArgumentNullException("oilService");
            }

            this._oilService = oilService;
            this._oilMakerService = oilMakerService;
            this._vehicleMakerService = vehicleMakerService;
            this._vehicleModelMakerService = vehicleModelMakerService;
            this._airFilterService = airFilterService;
            this._oilFilterService = oilFilterService;
            this._brakeOilService = brakeOilService;
            this._powerSteeringOilService = powerSteeringOilService;
        }
        /// <summary>
        /// Get All
        /// </summary>
        public Models.RecordBaseData Get()
        {
            return new RecordBaseData
            {
                OilMakerCompanies = _oilMakerService.GetAllOilMakers().OilMakers.Select(x=>x.CreateFrom()),
                Oils = _oilService.GetAll().Oils.Select(x => x.CreateFrom()),
                VehicleMakers = _vehicleMakerService.GetAllVehicleMakers().VehicleMakers.Select(x=>x.CreateFrom()),
                VehicleModelMaker = _vehicleModelMakerService.GetAllVehicleModelMakers(new MainDomain.VehicleModelMakerSearchRequest()).VehicleModelMakers.Select(x=>x.CreateFrom()),
                AirFilters = _airFilterService.GetAllAirFilters().AirFilters.Select(x=>x.CreateFrom()),
                OilFilters = _oilFilterService.GetAllOilFilters().OilFilters.Select(x=>x.CreateFrom()),
                BrakeOils = _brakeOilService.GetAllBrakeOils().BrakeOils.Select(x=>x.CreateFrom()),
                PowerSterringOils = _powerSteeringOilService.GetAllPowerSterringOils().PowerSterringOils.Select(x=>x.CreateFrom())
                
            };
        }
	}
}