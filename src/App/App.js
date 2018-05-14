import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_healpers/history';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_component/PrivateRoute';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { register } from '../Register/Register';
import Dashboard from '../components/common/dashboard';
import Addclass from '../components/app/classcomponent/addClass';
import Addparticipant from '../components/app/participantcomponent/addParticipant';
import EditClass from '../components/app/classcomponent/editClass';
import ClassList from '../components/app/classcomponent/classList';
import ParticipantList from '../components/app/participantcomponent/participantList';
import EditParticipant from '../components/app/participantcomponent/editParticipant';
import MarkAttendence from '../components/app/attendencecomponent/markattendence';
import ShowAttendence from '../components/app/attendencecomponent/showattendence';
import { Forgotpassword } from '../ForgotPassword/ForgotPassword';
import EditAttendence from '../components/app/attendencecomponent/editattendence';

class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div className="container-fluid">
                    <div >
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <div className="mb-5">
                                </div>
                                <div className="mt-5">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route exact path="/register" component={register} />
                                    <PrivateRoute exact path="/addclass" component={Addclass} />
                                    <PrivateRoute exact path="/classlist" component={ClassList} />
                                    <PrivateRoute exact path='/editclass/:cId' component={EditClass} />
                                    <PrivateRoute exact path="/addparticipant" component={Addparticipant} />
                                    <PrivateRoute exact path="/participantlist" component={ParticipantList} />
                                    <PrivateRoute exact path='/editparticipant/:pId' component={EditParticipant} />
                                    <PrivateRoute exact path="/markattendence" component={MarkAttendence} />
                                    <PrivateRoute exact path="/showattendence" component={ShowAttendence} />
                                    <PrivateRoute exact path='/editattendence/:aId' component={EditAttendence} />
                                    <Route exact path="/forgotpassword" component={Forgotpassword} />
                                </div>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };