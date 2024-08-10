using AspDotNetMVC.Models;
using AspDotNetMVC.Service;
using Microsoft.AspNetCore.Mvc;

namespace AspDotNetMVC.Controllers
{
    public class AuthController : Controller
    {
        private readonly AccountService _accountService;

        public AuthController()
        {
            _accountService = new AccountService();
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View(new Register());
        }

        [HttpPost]
        public async Task<ActionResult> Register(Register model)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountService.RegisterAsync(new Register
                {
                    UserName = model.UserName.Trim(),
                    Email = model.Email.Trim(),
                    Password = model.Password.Trim(),
                    ConfirmPassword = model.ConfirmPassword
                });

                // Console.WriteLine(result.ToString());

                if (result)
                {
                    // Handle successful registration
                    return RedirectToAction("Login");
                }

                ModelState.AddModelError("", "Registration failed");
            }

            return View(model);
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View(new Login());
        }

        [HttpPost]
        public async Task<ActionResult> Login(Login model)
        {
            if (ModelState.IsValid)
            {
                var result = await _accountService.LoginAsync(new Login
                {
                    Username = model.Username,
                    Password = model.Password
                });

                // Console.WriteLine($"{result.Success} - success {result.Token}   mytoken");

                if (result.Success && !string.IsNullOrEmpty(result.Token))
                {
                    // Handle successful login

                    //Response
                    Response.Cookies.Append("AuthToken", result.Token, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.Strict
                    });

                    return RedirectToAction("Index", "Books");
                }
                else if (!result.Success)
                {
                    ModelState.AddModelError("", "Login failed");
                }
                else
                {
                    ModelState.AddModelError("", "Token is missing or invalid");
                }
            }

            return View(model);
        }
    }

}
