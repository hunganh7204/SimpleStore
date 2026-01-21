import axiosClient from './axiosClient';

const authService = {
    
    register: (registerData) => {
        return axiosClient.post('/Auth/register', registerData);
    },

   
    login: (loginData) => {
        return axiosClient.post('/Auth/login', loginData);
    }
};

export default authService;