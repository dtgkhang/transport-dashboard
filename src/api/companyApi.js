import axiosClient from "./axiosClient";

const companyApi ={

    getAllTrip() {
        const url = `/api/trip/all`
        return axiosClient.get(url);
    }, getAllVehicle() {
        const url = `/api/vehicle/getAll`
        return axiosClient.get(url);
    }, getVehicleByCompanyId(id) {
        const url = `/api/company/vehicle/${id}`
        return axiosClient.get(url);
    },createVehicle(data){
        const url = `/api/vehicle/add`
        return axiosClient.post(url,data);
    },updateActive(id){
        const  url=`/api/vehicle/company/${id}`
        return axiosClient.patch(url)
    },getTripByCompanyId(id){
        const url = `/api/trip/company/${id}`
        return axiosClient.get(url);
    },getCompanyById(id){
        const url = `/api/company/${id}`
        return axiosClient.get(url);
    },createTrip(data){
        const url = `/api/trip/create`
        return axiosClient.post(url,data);
    },getBooked(id){
        const url = `/api/booking/company/${id}`
        return axiosClient.get(url);
    },deleteTrip(id){
        const url = `/api/trip/delete/${id}`
        return axiosClient.delete(url);
    },confirmBooking(id){
        const url = `/api/booking/cash/${id}`
        return axiosClient.get(url);
    },confirmRefund(id){
        const url = `/api/booking/returnTicket/${id}`
        return axiosClient.get(url);
    },updateTrip(id,data){
        const url = `/api/trip/${id}`
        return axiosClient.put(url,data);
    },cancelBooking(id){
        const url = `/api/booking/CancelBooking/${id}`
        return axiosClient.get(url);
    },

};

export default companyApi;