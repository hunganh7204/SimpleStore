using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleStore.API.DTOs;
using SimpleStore.API.Models;
using SimpleStore.API.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace SimpleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;

        // Inject Repository vào Controller
        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        // 1. GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _repository.GetAllAsync();

            // Chuyển đổi từ Model sang DTO (Thủ công)
            var productDtos = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                CategoryName = p.Category?.Name ?? "N/A"
            });

            return Ok(productDtos);
        }

        // 2. GET: api/products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound(); // Trả về lỗi 404
            }

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                CategoryName = product.Category?.Name ?? "N/A"
            };

            return Ok(productDto);
        }

        // 3. POST: api/products
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateProductDto createDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Chuyển từ DTO sang Model để lưu xuống DB
            var product = new Product
            {
                Name = createDto.Name,
                Price = createDto.Price,
                Description = createDto.Description,
                CategoryId = createDto.CategoryId
            };

            await _repository.AddAsync(product);

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // 4. PUT: api/products/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, CreateProductDto updateDto)
        {
            var existingProduct = await _repository.GetByIdAsync(id);
            if (existingProduct == null) return NotFound();

            // Cập nhật thông tin
            existingProduct.Name = updateDto.Name;
            existingProduct.Price = updateDto.Price;
            existingProduct.Description = updateDto.Description;
            existingProduct.CategoryId = updateDto.CategoryId;

            await _repository.UpdateAsync(existingProduct);

            return NoContent(); // Thành công nhưng không trả về nội dung gì (chuẩn REST)
        }

        // 5. DELETE: api/products/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var existingProduct = await _repository.GetByIdAsync(id);
            if (existingProduct == null) return NotFound();

            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
