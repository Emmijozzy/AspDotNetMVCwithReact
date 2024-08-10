using System.ComponentModel.DataAnnotations;

namespace AspDotNetMVC.Models
{
    public class Register
    {
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).*$", ErrorMessage = "Password must contain at least one lowercase, one uppercase, one number, and one special character")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Password and confirm password do not match")]
        public string ConfirmPassword { get; set; } // For password confirmation
    }
}