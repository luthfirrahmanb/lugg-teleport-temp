import React, { Component } from 'react';
import { Route, HashRouter as Router, Redirect } from 'react-router-dom';
import App from './App';
import Login from './components/login';
import Register from './components/register';
import VerifyAccount from './components/verify_account';
import ForgotPassword from './components/forgot_password';
import ConfirmNewPassword from './components/confirm_new_password';
import BookingForm from './components/booking_form';
import History from './components/history';
import ATHReview from './components/ath_review';
import HTAReview from './components/hta_review';
import HTHReview from './components/hth_review';
import ATAReview from './components/ata_review';
import PaymentMethod from './components/payment_method';
import ATHFinalReview from './components/ath_final_review';
import HTAFinalReview from './components/hta_final_review';
import HTHFinalReview from './components/hth_final_review';
import ATAFinalReview from './components/ata_final_review';


class Routes extends Component {

    render() {
        const token = localStorage.getItem('token');
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" render={() => (
                            token === null || token === undefined ? (
                                <Login />
                            ) : (
                                <App />
                                )
                        )} />
                        <Route path="/home" component={App} />
                        <Route path="/register" component={Register} />
                        <Route path="/booking" component={BookingForm} />
                        <Route path="/history" component={History} />
                        <Route path="/athreview" component={ATHReview} />
                        <Route path="/htareview" component={HTAReview} />
                        <Route path="/hthreview" component={HTHReview} />
                        <Route path="/atareview" component={ATAReview} />
                        <Route path="/athfinalreview" component={ATHFinalReview} />
                        <Route path="/htafinalreview" component={HTAFinalReview} />
                        <Route path="/hthfinalreview" component={HTHFinalReview} />
                        <Route path="/atafinalreview" component={ATAFinalReview} />
                        <Route path="/payment" component={PaymentMethod} />
                        <Route path="/verify" component={VerifyAccount} />
                        <Route path="/forgot" component={ForgotPassword} />
                        <Route path="/confirmnewpassword" component={ConfirmNewPassword} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes;