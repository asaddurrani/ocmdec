using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.ManualTransFluid
{
    public class ManualTransFluidAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "ManualTransFluid";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "ManualTransFluid_default",
                "ManualTransFluid/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}