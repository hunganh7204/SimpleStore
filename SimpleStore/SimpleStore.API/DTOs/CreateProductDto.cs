using System.ComponentModel.DataAnnotations;

namespace SimpleStore.API.DTOs
{
    public class CreateProductDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Giá phải lớn hơn 0")]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        [Required]
        public int CategoryId { get; set; } // Người dùng chọn ID của danh mục
    }
}
