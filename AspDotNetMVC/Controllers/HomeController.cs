using AspDotNetMVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AspDotNetMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var token = Request.Cookies["refreshToken"];

            if (token == null)
            {
                Console.WriteLine($"({token}) Authtoken");
            }
            Console.WriteLine($"({token}) Authtoken");
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
