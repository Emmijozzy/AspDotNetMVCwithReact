using AspDotNetMVCwithReact.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspDotNetMVCwithReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthApiController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthApiController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = GenerateJwtToken(user);
                user.AccessToken = token;
                user.RefreshTokenExpiryTime = DateTime.Now.AddMinutes(4); // Set refresh token expiry time
                await _userManager.UpdateAsync(user);

                return Ok(new { token });

            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            // Console.WriteLine(model.UserName);

            // Console.WriteLine(!ModelState.IsValid);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Console.WriteLine(!ModelState.IsValid);

            var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            Console.WriteLine(result);

            if (result.Succeeded)
            {
                return Ok(new { message = "Registration successful" });
            }

            var resultErrors = result.Errors.Select(e => e.Description).ToList();
            return BadRequest(string.Join(", ", resultErrors));
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            // get
            var expiredToken = "";
            var token = "";

            var authHeader = Request.Headers.Authorization;

            if (authHeader.Any())
            {
                expiredToken = authHeader.First().Split(" ").Last();
            }

            var principal = this.GetPrincipalFromExpiredToken(expiredToken);

            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userManager.FindByNameAsync(userId);

            if (user.RefreshTokenExpiryTime > DateTime.Now)
            {

                token = GenerateJwtToken(user);

                return Ok(new { token });
            }

            return Unauthorized();
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            Console.WriteLine(user.UserName);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var jwtSKey = _configuration["Jwt:Key"];

            Console.WriteLine(jwtSKey, "sky");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60), // Token expiry time
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
                ValidateLifetime = false // Here we are saying that we don't care about the token's expiration date
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
    }
}
