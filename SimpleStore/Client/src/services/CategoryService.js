import axiosClient from "./axiosClient";

const CategoryService = {
    getAll: () => {
        return axiosClient.get('/Categories');
    },
};

export default CategoryService;