using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;

public class JwtAuthorizationFilter : IAuthorizationFilter
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly byte[] _key;

    public JwtAuthorizationFilter(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
    {
        _httpContextAccessor = httpContextAccessor;
        _key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
                // Check if the requested page is the registeredPage
        if (context.HttpContext.Request.Path.Value.ToLower() == "/Auth/Register")
        {
            return;
        }
        
        var token = _httpContextAccessor.HttpContext?.Request.Cookies["AuthToken"];
        // var token4 = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        // Console.WriteLine($"{token4} {token}  tokenAuth");

        if (token == null)
        {
            context.Result = new RedirectResult("/Auth/Login");
            return;
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.First(x => x.Type == JwtRegisteredClaimNames.Sub).Value;

            foreach (var claim in jwtToken.Claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            }


            Console.WriteLine($"{userId} user");

            // Attach user information to the context
            _httpContextAccessor.HttpContext.Items["User"] = userId;
        }
        catch
        {
            context.Result = new RedirectResult("/Auth/Login");
        }
    }
}