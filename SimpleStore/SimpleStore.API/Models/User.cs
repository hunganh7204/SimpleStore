using System.ComponentModel.DataAnnotations;

namespace SimpleStore.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty; // Lưu mật khẩu đã mã hóa

        public string Role { get; set; } = "User"; // Mặc định là User thường
    }
}
