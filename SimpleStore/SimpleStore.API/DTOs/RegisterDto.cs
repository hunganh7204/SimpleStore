using System.ComponentModel.DataAnnotations;

namespace SimpleStore.API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(6, ErrorMessage = "Mật khẩu phải dài ít nhất 6 ký tự")]
        public string Password { get; set; } = string.Empty;
    }
}
