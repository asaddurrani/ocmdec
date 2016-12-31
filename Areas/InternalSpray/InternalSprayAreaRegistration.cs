using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.InternalSpray
{
    public class InternalSprayAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "InternalSpray";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "InternalSpray_default",
                "InternalSpray/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}