using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.CarShampoo
{
    public class CarShampooAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "CarShampoo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "CarShampoo_default",
                "CarShampoo/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}