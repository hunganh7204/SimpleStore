import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login({ username, password });

            // 👇 1. Debug: Xem chính xác Backend trả về cái gì
            console.log("Backend response:", response.data);

            const data = response.data;
            const token = data.token;

            // 👇 2. Logic an toàn: Tự tạo object user nếu backend không trả về object "user"
            // Nếu data.user có thì lấy, không thì tự tạo object mới từ username
            const userInfo = data.user || { username: data.username || username };

            // 👇 3. Cập nhật Context
            login(token, userInfo);

            alert("Đăng nhập thành công!");
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản.");
        }
    };

    // 👇 4. Giao diện Dark Mode (dùng class CSS trong index.css)
    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
            <div style={{
                backgroundColor: 'var(--card-bg)', // Màu nền tối
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
                    🔐 Đăng nhập
                </h2>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            placeholder="Nhập tên đăng nhập..."
                        // Input sẽ tự ăn style từ index.css
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#ccc' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="Nhập mật khẩu..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary" // Class nút bấm đẹp
                        style={{ width: '100%', padding: '12px', fontSize: '1rem', marginBottom: '15px' }}
                    >
                        Đăng nhập
                    </button>

                    <div style={{ textAlign: 'center', color: '#888' }}>
                        Chưa có tài khoản? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Đăng ký ngay</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;