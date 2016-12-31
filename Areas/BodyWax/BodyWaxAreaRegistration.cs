using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.BodyWax
{
    public class BodyWaxAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "BodyWax";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "BodyWax_default",
                "BodyWax/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}