import SignInForm from '../components/views/signin/SignInForm';
import Global from '../components/reusable/Global';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import '../assets/styles/main.scss';

export default function Signin() {
    return (
        <Global>
            <GoogleAnalyticsLogger>
                <div className='landing-main-wrapper'>
                    <div className='landing-main-wrapper'>
                        <div className='content-wrapper'>
                            <div className='col-12'>
                                <div className='landing-wrapper'>
                                    <div className='auth-content'>
                                        <SignInForm 
                                        showBreadCrumbs={true}
                                        displayRegistrationLayout={true}
                                        actiontTitle='Sign in'
                                        redirectPageAfterLogin='/'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GoogleAnalyticsLogger>
        </Global>
    );
}