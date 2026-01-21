import axiosClient from "./axiosClient";

const productService = {
    getAll: () => {
    return axiosClient.get('/Products');
    },
    getById: (id) => {
    return axiosClient.get(`/Products/${id}`);
    },
    create: (data) => {
    return axiosClient.post('/Products', data);
    },
    update: (id, data) => {
        return axiosClient.put(`/Products/${id}`,data);
    },
    delete: (id) => {
        return axiosClient.delete(`/Products/${id}`);
    },

};

export default productService;