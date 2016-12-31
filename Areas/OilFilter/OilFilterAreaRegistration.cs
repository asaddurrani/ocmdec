using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.OilFilter
{
    public class OilFilterAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "OilFilter";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "OilFilter_default",
                "OilFilter/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}