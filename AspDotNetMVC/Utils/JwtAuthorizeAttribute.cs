using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace AspDotNetMVC.Utils
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class JwtAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var jwtAuthorizationFilter = context.HttpContext.RequestServices.GetService(typeof(JwtAuthorizationFilter)) as JwtAuthorizationFilter;
            if (jwtAuthorizationFilter != null)
            {
                jwtAuthorizationFilter.OnAuthorization(context);
            }
        }
    }

}
