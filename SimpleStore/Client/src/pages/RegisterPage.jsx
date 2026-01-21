import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const RegisterPage = () => {
    const navigate = useNavigate();

    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        username: '',
       
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Kiểm tra mật khẩu xác nhận
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            // 2. Gọi API Đăng ký
            // Lưu ý: Backend .NET thường yêu cầu object { Username, Email, Password }
            await authService.register({
                username: formData.username,
                
                password: formData.password
            });

            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate('/login'); // Chuyển hướng về trang đăng nhập
        } catch (error) {
            console.error(error);
            // Hiển thị lỗi từ Backend trả về (nếu có)
            const message = error.response?.data?.message || "Đăng ký thất bại! Vui lòng thử lại.";
            alert(message);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '40px',
                borderRadius: '12px',
                border: '1px solid #333',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{
                    marginTop: 0,
                    marginBottom: '30px',
                    textAlign: 'center',
                    color: 'var(--primary-color)',
                    fontSize: '1.8rem'
                }}>
                    📝 Đăng ký tài khoản
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Username <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Nhập tên tài khoản..."
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Mật khẩu <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Nhập mật khẩu..."
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Nhập lại mật khẩu..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '12px', fontSize: '1rem', marginBottom: '15px' }}
                    >
                        Đăng ký ngay
                    </button>

                    <div style={{ textAlign: 'center', color: '#888' }}>
                        Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;