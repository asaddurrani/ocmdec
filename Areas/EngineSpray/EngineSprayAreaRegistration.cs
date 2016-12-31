using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.EngineSpray
{
    public class EngineSprayAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "EngineSpray";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "EngineSpray_default",
                "EngineSpray/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}