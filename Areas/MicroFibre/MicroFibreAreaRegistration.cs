using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.MicroFibre
{
    public class MicroFibreAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MicroFibre";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MicroFibre_default",
                "MicroFibre/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}