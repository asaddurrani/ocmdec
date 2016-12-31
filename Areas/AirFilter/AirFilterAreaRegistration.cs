using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.AirFilter
{
    public class AirFilterAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "AirFilter";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "AirFilter_default",
                "AirFilter/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}