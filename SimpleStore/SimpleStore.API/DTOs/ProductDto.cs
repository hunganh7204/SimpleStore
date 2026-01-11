namespace SimpleStore.API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string CategoryName { get; set; } = string.Empty; // Chỉ lấy tên, không lấy cả object
    }
}
