using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.TyreWax
{
    public class TyreWaxAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "TyreWax";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "TyreWax_default",
                "TyreWax/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}