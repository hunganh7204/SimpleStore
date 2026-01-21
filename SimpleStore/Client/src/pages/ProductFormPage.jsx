import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

const ProductFormPage = () => {
    // --- PHẦN 1: LOGIC (GIỮ NGUYÊN 100%) ---
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAll();
                setCategories(response.data);

                if (!isEditMode && response.data.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        categoryId: response.data[0].id || response.data[0].Id
                    }));
                }
            } catch (error) {
                console.error("Lỗi lấy danh mục:", error);
            }
        };
        fetchCategories();
    }, [isEditMode]);

    useEffect(() => {
        if (isEditMode) {
            const fetchProductDetail = async () => {
                try {
                    const response = await productService.getById(id);
                    const data = response.data;
                    setFormData({
                        name: data.name || data.Name,
                        price: data.price || data.Price,
                        description: data.description || data.Description,
                        categoryId: data.categoryId || data.CategoryId || 1
                    });
                } catch (error) {
                    console.error("Lỗi tải chi tiết:", error);
                    alert("Không tìm thấy sản phẩm!");
                }
            };
            fetchProductDetail();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...formData,
                categoryId: Number(formData.categoryId)
            };
            if (isEditMode) {
                await productService.update(id, submitData);
                alert("Cập nhật thành công!");
            } else {
                await productService.create(submitData);
                alert("Thêm mới thành công!");
            }
            navigate('/');
        } catch (error) {
            console.error("Lỗi lưu dữ liệu:", error);
            alert("Có lỗi xảy ra, vui lòng kiểm tra lại console.");
        }
    };

    // --- PHẦN 2: GIAO DIỆN DARK MODE (CẬP NHẬT) ---
    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '40px' }}>
            {/* Tạo khung Card bao quanh Form */}
            <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid #333',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{
                    marginTop: 0,
                    marginBottom: '25px',
                    textAlign: 'center',
                    color: 'var(--primary-color)',
                    fontSize: '1.8rem'
                }}>
                    {isEditMode ? "✏️ Cập nhật sản phẩm" : "✨ Thêm sản phẩm mới"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Tên sản phẩm <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Nhập tên sản phẩm..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                                Giá (VND) <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                                Danh mục <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id || cat.Id} value={cat.id || cat.Id}>
                                        {cat.name || cat.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Mô tả chi tiết
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Nhập mô tả sản phẩm..."
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    {/* Buttons: Dùng class thay vì style inline */}
                    <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
                        >
                            {isEditMode ? "Lưu thay đổi" : "Tạo mới"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-outline"
                            style={{ width: '120px', justifyContent: 'center' }}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormPage;