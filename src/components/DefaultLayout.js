import React  from 'react';

import {MenuUnfoldOutlined , MenuFoldOutlined ,DesktopOutlined,PoweroffOutlined, PieChartOutlined, UserOutlined ,TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const CompanyItems = [
    // getItem('Dashboard', '/company', <PieChartOutlined />),
    getItem('Vehicle', '/company/vehicle', <DesktopOutlined />),
    getItem('Trip', '/company/trip', <UserOutlined />),
    getItem('Booking', '/company/booking', <UserOutlined />),
    getItem('Voucher', '/company/voucher', <DesktopOutlined />),
    getItem("Log Out",'/LogOut',<PoweroffOutlined/>)

];
const AdminItems = [
    // getItem('Dashboard', '/admin', <PieChartOutlined />),
    // getItem('User', '/admin/user', <DesktopOutlined />),
    getItem('Company', '/admin/company', <DesktopOutlined />),
    getItem('Voucher', '/admin/voucher', <DesktopOutlined />),

    getItem("Log Out","/LogOut",<PoweroffOutlined/>)

    // getItem('Trip', '/company/trip', <UserOutlined />),
    // getItem('Booking', '/company/booking', <UserOutlined />),

];
function DefaultLayout ({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const {user}= useSelector(state => state.user);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const RenderItems = user.role ==="ADMIN" ? AdminItems :CompanyItems

    return (
        
        <Layout className='section-bg'
            style={{
                minHeight: '100vh',
            }}
        >
               
      <div className="sidebar-nav sidebar--nav">
        <div className="sidebar-nav-body">
          <div className="side-menu-close">
            <i className="la la-times" />
          </div>{/* end menu-toggler */}
          <div className="author-content">
            <div className="d-flex align-items-center">
              <div className="author-img avatar-sm">
                {/* <img src="images/team9.jpg" alt="testimonial image" /> */}
              </div>
              <div className="author-bio">
                <h4 className="author__title">SWP</h4>
                <span className="author__meta">Welcome to Admin Panel</span>
              </div>
            </div>
          </div>
          <div className="sidebar-menu-wrap">
          <Menu defaultSelectedKeys={['/company']} onClick={({key})=>{navigate(key)}} mode="inline" items={RenderItems} />

          </div>{/* end sidebar-menu-wrap */}
        </div>
      </div>

                {/*<button className="btn btn-danger">Log out</button>*/}
<section className='dashboard-area'> 
<div className="dashboard-content-wrap">
        <div className="dashboard-bread dashboard-bread-2">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title font-size-30 text-white">Dashboard</h2>
                  </div>
                </div>{/* end breadcrumb-content */}
              </div>{/* end col-lg-6 */}
              <div className="col-lg-6">
                <div className="breadcrumb-list text-right">
                  <ul className="list-items">
                    <li><a href="index.html" className="text-white">Home</a></li>
                    <li>Pages</li>
                    <li>Dashboard</li>
                  </ul>
                </div>{/* end breadcrumb-list */}
              </div>{/* end col-lg-6 */}
            </div>{/* end row */}
    
          </div>
        </div>{/* end dashboard-bread */}
        <div className="dashboard-main-content">
          <div className="container-fluid">
          <Layout className="site-layout">
             
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}

                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >{children}

                    </div>
                </Content>
            
            </Layout>
            <div className="border-top mt-4" />
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="copy-right padding-top-30px">
                  <p className="copy__desc">
                  FPT ©2023 Created by khangdtg
                    <span className="la la-heart" /> by <a href="https://themeforest.net/user/techydevs/portfolio">TechyDevs</a>
                  </p>
                </div>{/* end copy-right */}
              </div>{/* end col-lg-7 */}
              <div className="col-lg-5">
                <div className="copy-right-content text-right padding-top-30px">
                  <ul className="social-profile">
                    <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                    <li><a href="#"><i className="lab la-twitter" /></a></li>
                    <li><a href="#"><i className="lab la-instagram" /></a></li>
                    <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                  </ul>
                </div>{/* end copy-right-content */}
              </div>{/* end col-lg-5 */}
            </div>{/* end row */}
          </div>{/* end container-fluid */}
        </div>{/* end dashboard-main-content */}
      </div>
            
</section>
          
            
        </Layout>
    );
};
export default DefaultLayout;