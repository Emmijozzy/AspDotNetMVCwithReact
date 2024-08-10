using Microsoft.AspNetCore.Identity;

namespace AspDotNetMVCwithReact.Server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public string? AccessToken { get; set; }
    }
}
