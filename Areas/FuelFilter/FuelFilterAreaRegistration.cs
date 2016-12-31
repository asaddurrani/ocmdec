using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.FuelFilter
{
    public class FuelFilterAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "FuelFilter";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "FuelFilter_default",
                "FuelFilter/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}