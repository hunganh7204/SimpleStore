using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SimpleStore.API.Data;
using SimpleStore.API.DTOs;
using SimpleStore.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SimpleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        // Inject Configuration để đọc Key từ appsettings.json
        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // 1. ĐĂNG KÝ
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            // Kiểm tra xem username đã tồn tại chưa
            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return BadRequest("Username đã tồn tại.");
            }

            // Tạo user mới và Băm mật khẩu (Hashing)
            var user = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), // Băm password
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Đăng ký thành công!");
        }

        // 2. ĐĂNG NHẬP
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {
            // Tìm user trong DB
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            // Kiểm tra: User có tồn tại không? Mật khẩu có khớp với bản băm không?
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Sai tên đăng nhập hoặc mật khẩu.");
            }

            // Nếu đúng, tạo Token trả về
            string token = CreateToken(user);

            return Ok(new { Token = token });
        }

        // HÀM TẠO TOKEN (Private)
        private string CreateToken(User user)
        {
            // 1. Tạo các Claims (Thông tin đính kèm trong token)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
                // Có thể thêm ID user vào đây nếu cần
            };

            // 2. Lấy Key bí mật từ appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("Jwt:Key").Value!));

            // 3. Tạo chữ ký (Credentials)
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // 4. Cấu hình Token
            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration.GetSection("Jwt:Issuer").Value,
                audience: _configuration.GetSection("Jwt:Audience").Value,
                claims: claims,
                expires: DateTime.Now.AddDays(1), // Token hết hạn sau 1 ngày
                signingCredentials: creds
            );

            // 5. Viết Token ra chuỗi string
            var jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

            return jwt;
        }
    }
}