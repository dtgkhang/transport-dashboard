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
    },createVouncher(data){
        const url = `/api/voucher`
        return axiosClient.post(url,data);
    },getVoucherAdmin(accountId){
        const url = `/api/voucher/getVoucherByOwner/${accountId}`
        return axiosClient.get(url);
    },inactiveVoucher(id){
        const url = `/api/voucher/${id}`
        return axiosClient.delete(url);
    },updateVoucher(data){
        const url = `/api/voucher/update`
        return axiosClient.put(url,data)
    }
    
};

export default adminApi;