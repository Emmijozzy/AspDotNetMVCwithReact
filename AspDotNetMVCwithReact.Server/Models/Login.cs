using System.ComponentModel.DataAnnotations;

namespace AspDotNetMVCwithReact.Server.Models
{
    public class Login
    {
        [Required(ErrorMessage = "Username is required")]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters long")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).*$", ErrorMessage = "Password must contain at least one lowercase, one uppercase, one number, and one special character")]
        public string Password { get; set; }
    }
}
