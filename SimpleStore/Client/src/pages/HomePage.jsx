import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';

const HomePage = () => {
    // --- PHẦN 1: LOGIC (GIỮ NGUYÊN HOÀN TOÀN) ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await productService.getAll();
            setProducts(response.data);
        } catch (err) {
            console.error("Lỗi API:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này không?")) {
            try {
                await productService.delete(id);
                // Giữ nguyên logic lọc mảng của bạn
                setProducts(products.filter(p => (p.id || p.Id) !== id));
                alert("Xóa thành công");
            } catch (err) {
                console.error("Lỗi khi xóa: ", err);
                alert("Xóa thất bại");
            }
        }
    };

    // --- PHẦN 2: GIAO DIỆN (ĐƯỢC NÂNG CẤP DARK MODE) ---
    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: 50 }}>🌀 Đang tải dữ liệu...</div>;
    if (error) return <div className="container" style={{ color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div className="container" style={{ marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>Quản lý sản phẩm</h1>

                {/* Thay style cũ bằng class "btn btn-success" */}
                <Link to="/create" className="btn btn-success">
                    + Thêm mới
                </Link>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px'
            }}>
                {products.map((product) => (
                    <div key={product.id || product.Id} style={{
                        backgroundColor: 'var(--card-bg)', // Dùng màu từ index.css
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #333',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s'
                    }}>
                        <div>
                            {/* Tiêu đề */}
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#fff' }}>
                                {product.name || product.Name}
                            </h3>

                            {/* Giá tiền */}
                            <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>
                                {(product.price || product.Price).toLocaleString('vi-VN')} VND
                            </p>

                            {/* Mô tả */}
                            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.5', minHeight: '40px' }}>
                                {product.description || product.Description || "Chưa có mô tả"}
                            </p>
                        </div>

                        {/* Nút bấm (Action Buttons) */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid #444', paddingTop: '15px' }}>
                            <Link to={`/edit/${product.id || product.Id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                ✏️ Sửa
                            </Link>

                            <button
                                onClick={() => handleDelete(product.id || product.Id)}
                                className="btn btn-danger"
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                🗑️ Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                    <p>Chưa có sản phẩm nào.</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;