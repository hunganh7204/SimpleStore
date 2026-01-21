import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        // Sử dụng style flexbox để căn chỉnh đẹp hơn
        <nav style={{
            backgroundColor: '#252525',
            borderBottom: '1px solid #333',
            padding: '15px 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
                {/* Logo */}
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', letterSpacing: '1px' }}>
                    🛍️ SimpleStore
                </Link>

                {/* Menu bên phải */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {user ? (
                        <>
                            <span style={{ color: '#aaa' }}>Xin chào, <b style={{ color: 'white' }}>{user.username || "User"}</b></span>
                            <button onClick={logout} className="btn btn-outline" style={{ padding: '5px 12px', fontSize: '0.85rem' }}>
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
                            <Link to="/register" style={{ color: '#aaa', fontWeight: 500 }}>Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;