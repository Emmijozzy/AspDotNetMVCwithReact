using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AspDotNetMVC.Controllers
{
    public abstract class BaseController: Controller
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            ViewData["CurrentAction"] = filterContext.ActionDescriptor.RouteValues["action"];
            ViewData["CurrentController"] = filterContext.ActionDescriptor.RouteValues["controller"];
            base.OnActionExecuting(filterContext);
        }
    }
}