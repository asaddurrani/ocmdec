using System.Web.Mvc;

namespace IstMvcFramework.Areas.PowerSteeringOil
{
    public class PowerSteeringOilAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "PowerSteeringOil";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "PowerSteeringOil_default",
                "PowerSteeringOil/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}