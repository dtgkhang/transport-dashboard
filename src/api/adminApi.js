import axiosClient from "./axiosClient";

const adminApi ={

    getAllCompany() {
        const url = `/api/company`
        return axiosClient.get(url);
    },createCompany(data){
        const url = `/api/company/register`
        return axiosClient.post(url,data);
    },getAllUser(){
        const url = `/api/accounts`
        return axiosClient.get(url);
    },
    deleteCompany(id){
        const url = `/api/company${id}`
        return axiosClient.get(url);
    }

};

export default adminApi;