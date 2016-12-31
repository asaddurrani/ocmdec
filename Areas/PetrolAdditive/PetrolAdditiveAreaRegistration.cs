using System.Web.Mvc;

namespace AspNetIdentity2ExtendingUsersAndRoles.Areas.PetrolAdditive
{
    public class PetrolAdditiveAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "PetrolAdditive";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "PetrolAdditive_default",
                "PetrolAdditive/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}