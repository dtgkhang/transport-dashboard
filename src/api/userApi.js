import axiosClient from "./axiosClient";

const userApi = {
    getUser(id) {
        const url = `/api/accounts/${id}`;
        return axiosClient.get(url);
    },
    updateUser(id, data) {
        const url = `/api/accounts/${id}`;
        return axiosClient.patch(url, data);
    },
    checkLogin(data) {
        const url = `/api/auth/login`;
        return axiosClient.post(url, {data});
    },
    registerUser() {
        const url = `/api/auth/register`;
        return axiosClient.patch(url);
    },
    changePassword(id) {
        const url = `/api/accounts/change/${id}`;
        return axiosClient.patch(url);
    },

};

export default userApi;
