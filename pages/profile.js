import React, { Component } from 'react';
import Router from 'next/router';
import SideProfile from "../components/views/profile/SideProfile";
import Global from '../components/reusable/Global';
import OrderRow from '../components/views/profile/OrderRow';
import OrderDetail from "../components/views/profile/OrderDetail";
import '../assets/styles/layouts/profile.scss';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import { getClientAuthToken } from '../helpers/auth';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContent: 'orders',
            customerOrdersData: [],
            activeId: 0
        };
        this.renderContentProfile = this.renderContentProfile.bind(this);
        this.changeActiveContent = this.changeActiveContent.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
    }
    async componentDidMount() {
        const isClient = typeof document !== undefined;
        if (isClient) {
            const token = getClientAuthToken();
            if (token) {
                const res = await fetch(`${API_URL}/customers/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const response = await res.json();
                this.setState({
                    customerOrdersData: response.data
                })
            } else {
                Router.push('/signin')
            }
        }
    }

    changeActiveContent(id) {
        const { activeContent } = this.state;
        if (id !== undefined) {
            this.setState({
                activeId: id
            });
        }
        if (activeContent === 'orders') {
            this.setState({
                activeContent: 'singleOrder'
            });
        }
    }

    renderContentProfile() {
        const { activeContent, customerOrdersData, activeId } = this.state;
        switch(activeContent) {
            case 'orders':
                return (
                    <OrderRow 
                    orders={customerOrdersData}
                    changeActiveContent={this.changeActiveContent}
                    />
                );
            case 'singleOrder':
                return <OrderDetail orderId={activeId}/>
            
            default:
                // Redirect to 404 page
        }
    }

    changeActivePage() {
        const { activeContent } = this.state;
        if (activeContent === 'singleOrder') {
            this.setState({
                activeContent: 'orders'
            });
        }
    }

    render () {
        return (
            <GoogleAnalyticsLogger>
                <Global>
                    <div className="row reset-row profile-page">
                        <div className="col-lg-3 col-md-3 col-sm-5 col-12 sidemenu">
                            <SideProfile changeActivePage={this.changeActivePage} />
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-7 col-12 main-content">
                            {this.renderContentProfile()}
                        </div>
                    </div>
                </Global>
            </GoogleAnalyticsLogger>
        );
    }
}

export default Profile;