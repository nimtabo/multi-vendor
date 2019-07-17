import '../assets/styles/layouts/landing.scss';
import '../assets/styles/layouts/auth.scss';
import ForgotPasswordForm from '../components/views/forgotPassword/ForgotPasswordForm';
import PopUpWrapper from '../components/reusable/PopUpWrapper';

export default function Forgot() {
    return (
        <div className='landing-main-wrapper'>
            <PopUpWrapper/>
            
            <div className='content-wrapper'>
                <div className='col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
                    <div className='landing-wrapper'>
                        <div className='auth-content'>
                            <ForgotPasswordForm 
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
    );
}