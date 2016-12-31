using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.Oil
{
    public class OilAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Oil";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Oil_default",
                "Oil/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}