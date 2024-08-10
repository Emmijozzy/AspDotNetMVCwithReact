using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspDotNetMVCwithReact.Server.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ProtectedApiController : Controller
    {
        [HttpGet("data")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public IActionResult Index()
        {
            var userName = User.Identity.Name;
            return Ok(new { Message = $"Hello, {userName}. This is protected data." });
        }
    }
}
