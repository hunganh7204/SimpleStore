import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Khi F5 trang web, kiểm tra xem còn token không để giữ đăng nhập
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            try {
                if (savedUser !== "undefined" && savedUser !== "null") {
                    setUser(JSON.parse(savedUser));
                } else {
                    // Nếu dữ liệu là rác "undefined", xóa nó đi
                    localStorage.removeItem('user');
                }
            } catch (e) {
                console.error("Lỗi dữ liệu user cũ, tự động reset:", e);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, []);

    
    const login = (token, userInfo) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
    };

    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);