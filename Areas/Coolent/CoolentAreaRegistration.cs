using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.Coolent
{
    public class CoolentAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Coolent";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Coolent_default",
                "Coolent/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}