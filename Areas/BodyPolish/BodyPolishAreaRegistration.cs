using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.BodyPolish
{
    public class BodyPolishAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "BodyPolish";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "BodyPolish_default",
                "BodyPolish/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}