using System.ComponentModel.DataAnnotations;

namespace AspDotNetMVCwithReact.Server.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot be longer than 200 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Author is required")]
        [StringLength(150, ErrorMessage = "Author name cannot be longer than 150 characters")]
        public string Author { get; set; }

        [Required(ErrorMessage = "ISBN is required")]
        [StringLength(13, MinimumLength = 10, ErrorMessage = "ISBN must be between 10 and 13 characters long")]
        public string ISBN { get; set; }

        [Required(ErrorMessage = "Publication Date is required")]
        [DataType(DataType.Date)]
        public DateTime PublicationDate { get; set; }

        [StringLength(1000, ErrorMessage = "Description cannot be longer than 1000 characters")]
        public string Description { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Number of pages must be a positive number")]
        public int NumberOfPages { get; set; }

        [Required(ErrorMessage = "Genre is required")]
        [StringLength(100, ErrorMessage = "Genre cannot be longer than 100 characters")]
        public string Genre { get; set; }

        [StringLength(100, ErrorMessage = "Publisher name cannot be longer than 100 characters")]
        public string Publisher { get; set; }

        [Required(ErrorMessage = "Language is required")]
        [StringLength(50, ErrorMessage = "Language cannot be longer than 50 characters")]
        public string Language { get; set; }
    }
}
