using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.SeatFoamSpray
{
    public class SeatFoamSprayAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "SeatFoamSpray";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "SeatFoamSpray_default",
                "SeatFoamSpray/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}