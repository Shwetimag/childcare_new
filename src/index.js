import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './_healpers/store';
import { App } from './App/App';
import { fetchAllClasses } from './actions/classActions';
import { fetchAllParticipant } from './actions/participantActions';
import { fetchAllAttendence } from './actions/attendenceActions';
import { BrowserRouter } from 'react-router-dom';


const store = configureStore();
store.dispatch(fetchAllClasses());
store.dispatch(fetchAllParticipant());
store.dispatch(fetchAllAttendence());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,

    document.getElementById('app')
);
