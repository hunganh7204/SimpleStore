using Microsoft.EntityFrameworkCore;
using SimpleStore.API.Models;
using System.Collections.Generic;

namespace SimpleStore.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Khai báo các bảng muốn tạo trong Database
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }
    }
}

