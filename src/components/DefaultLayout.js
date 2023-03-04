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
    getItem('Dashboard', '/company', <PieChartOutlined />),
    getItem('Vehicle', '/company/vehicle', <DesktopOutlined />),
    getItem('Trip', '/company/trip', <UserOutlined />),
    getItem('Booking', '/company/booking', <UserOutlined />),
    getItem("Log Out",'/LogOut',<PoweroffOutlined/>)

];
const AdminItems = [
    getItem('Dashboard', '/admin', <PieChartOutlined />),
    getItem('Company', '/admin/company', <DesktopOutlined />),
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
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider  trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />


                <Menu theme="dark" defaultSelectedKeys={['/company']} onClick={({key})=>{navigate(key)}} mode="inline" items={RenderItems} />
                {/*<button className="btn btn-danger">Log out</button>*/}
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
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
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    FPT ©2023 Created by khangdtg
                </Footer>
            </Layout>
        </Layout>
    );
};
export default DefaultLayout;