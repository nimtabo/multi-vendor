import React, { Component } from 'react';
import PrivacyPolicy from "../components/reusable/PrivacyPolicy";
import Global from '../components/reusable/Global';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import '../assets/styles/main.scss';

class Profile extends Component {
    render () {
        return (
            <GoogleAnalyticsLogger>
                <Global>
                    <div className="row reset-row doc-page">
                        <div className="col-lg-8 col-md-8 col-sm-10 col-10 offset-lg-2 offset-md-2 offset-sm-1 offset-xs-1 content-wrapper">
                            <PrivacyPolicy/>
                        </div>
                    </div>
                </Global>
            </GoogleAnalyticsLogger>
        );
    }
}

export default Profile;