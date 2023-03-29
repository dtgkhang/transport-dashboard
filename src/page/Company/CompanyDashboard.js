import React, { useEffect, useState } from 'react'

import {Chart as ChartJS , BarElement,CategoryScale,LinearScale,Tooltip,Legend} from 'chart.js';
import {
  Bar
} from 'react-chartjs-2';
import companyApi from '../../api/companyApi';
import { useSelector } from 'react-redux';
import { message } from 'antd';
function CompanyDashboard() {
  const [booking, setBooking] = useState([]);
  
   //Refesh
   const { user } = useSelector((state) => state.user);
   const [vehicles, setVehicles] = useState([]);

const getBooked = async () => {
  try {
    const response = await companyApi.getBooked(user.companyId);

    console.log(response.data);

    if (response.data) {
      setVehicles(response.data);
    } else {
      message.error(response.data.message);
    }
  } catch (err) {
    // message.error(err.message);
  }
};
  
  const getBookedDashboard = async () => {
    try {
      const response = await companyApi.getBooking7days(user.companyId);
  
      console.log(response.data.totalBooking);
  
      if (response.data) {
        setBooking(response.data.totalBooking);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      // message.error(err.message);
    }
  };

  const data ={
    labels:['24/03/2023','25/03/2023','26/03/2023','27/03/2023','28/03/2023','29/03/2023','30/03/2023'],
    datasets:[
   { label:'Booking',  
     data:booking,
      backroundColor:'aqua',
      borderColor: "black",
      borderWidth:1}
    ]
 
  }
  const totalActive=(arr)=>{
    let active =0
    arr.map(x=>
      {  if(x.status === "DONE"){
        active++
        }}
    )
    return active;
  }
  const totalIntive=(arr)=>{
    let inactive =0
    arr.map(x=>
      {  if(x.status === "REJECTED"){
        inactive++
        }}
    )
    return inactive;
  }
  
  const requestRefund=(arr)=>{
    let inactive =0
    arr.map(x=>
      {  if(x.status === "REQUESTREFUND"){
        inactive++
        }}
    )
    return inactive;
  }
  useEffect(() => {
    getBooked();
    getBookedDashboard()
//   console.log("Booked ", vehicles.status);
}, []);

    return (
      <section>
 
      <div className="">
          <div className="container-fluid">
            <div className="row">
         
              <div className="col-lg-12">
              <div className="d-block">
                
                <div className="row mt-4">
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total Bookings</p>
                          <h4 className="info__title">{vehicles.length}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-4">
                          <i className="la la-shopping-cart" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-booking.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total Done!</p>
                          <h4 className="info__title">{ totalActive(vehicles)}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-3">
                          <i className="la la-star" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-reviews.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total REJECTED!</p>
                          <h4 className="info__title">{totalIntive(vehicles)}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-2">
                          <i className="la la-envelope" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-subscribers.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Request-Refund</p>
                          <h4 className="info__title">{requestRefund(vehicles)}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-1">
                          <i className="la la-bookmark-o" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-wishlist.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                </div>{/* end row */}
                      </div>
              </div>{/* end col-lg-12 */}
              <div className="col-lg-6 responsive-column--m">
                <div className="form-box dashboard-card">
                  <div className="form-title-wrap">
                    <h3 className="title">Total Orders</h3>
                  </div>
                  <div className="form-content">
                    <Bar data={data}>
                    </Bar>
                  </div>
                </div>{/* end form-box */}
              </div>{/* end col-lg-6 */}
              <div className="col-lg-6 responsive-column--m">
                <div className="form-box dashboard-card">
                  <div className="form-title-wrap">
                    <h3 className="title">Server Stats</h3>
                  </div>
                  <div className="form-content pb-0">
                    <div className="dashboard-progressbar pb-4">
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%'}} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="font-size-14 pt-1">Disk space usage: 1,746.5 / 50,000 MB</p>
                    </div>{/* end dashboard-progressbar */}
                    <div className="dashboard-progressbar pb-4">
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="font-size-14 pt-1">Monthly Bandwidth Transfer: 14,706.1 / 30.000</p>
                    </div>{/* end dashboard-progressbar */}
                    <div className="dashboard-progressbar pb-4">
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="font-size-14 pt-1">Subdomains: 7/15</p>
                    </div>{/* end dashboard-progressbar */}
                    <div className="dashboard-progressbar pb-4">
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: '75%'}} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="font-size-14 pt-1">All SQL Databases : 6/8</p>
                    </div>{/* end dashboard-progressbar */}
                    <div className="dashboard-progressbar pb-4">
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: '100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="font-size-14 pt-1">Email Accounts: 8 / 10</p>
                    </div>{/* end dashboard-progressbar */}
                  </div>
                </div>{/* end form-box */}
              </div>{/* end col-lg-6 */}
           
           
            </div>{/* end row */}
            <div className="border-top mt-4" />
            
          </div>{/* end container-fluid */}
      </div>{/* end dashboard-content-wrap */}
    </section>   )
}

export default CompanyDashboard