using SimpleStore.API.Models;

namespace SimpleStore.API.Repositories
{
    public interface IProductRepository
    {
        // Lấy danh sách sản phẩm
        Task<IEnumerable<Product>> GetAllAsync();

        // Lấy 1 sản phẩm theo ID
        Task<Product?> GetByIdAsync(int id);

        // Thêm mới
        Task AddAsync(Product product);

        // Cập nhật
        Task UpdateAsync(Product product);

        // Xóa
        Task DeleteAsync(int id);
    }
}
