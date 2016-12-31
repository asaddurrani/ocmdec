using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.AutoTransFluid
{
    public class AutoTransFluidAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AutoTransFluid";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AutoTransFluid_default",
                "AutoTransFluid/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}