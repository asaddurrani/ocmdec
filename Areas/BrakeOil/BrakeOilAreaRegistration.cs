using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.BrakeOil
{
    public class BrakeOilAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "BrakeOil";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "BrakeOil_default",
                "BrakeOil/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}