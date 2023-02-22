import axiosClient from "./axiosClient";

const adminApi ={

    getAllCompany() {
        const url = `/api/company`
        return axiosClient.get(url);
    },createCompany(data){
        const url = `/api/company/register`
        return axiosClient.post(url,data);
    }

};

export default adminApi;