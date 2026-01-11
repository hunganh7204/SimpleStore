using System.ComponentModel.DataAnnotations;
namespace SimpleStore.API.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        // Mối quan hệ: Một danh mục có nhiều sản phẩm
        // Đây gọi là Navigation Property
        public ICollection<Product>? Products { get; set; }
    }
}
