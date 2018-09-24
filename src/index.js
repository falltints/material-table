import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './reset.css';
import './main.css';
import './mouseMove';
import store from './store';
import {getAlarmAction} from "./store/actionCreators";

/*const action = getAlarmAction();
setInterval(() => {
    if (!store.getState().mouseMove) {
        store.dispatch(action);
    }
}, 1000);*/

ReactDOM.render(<App />, document.getElementById('table'));
