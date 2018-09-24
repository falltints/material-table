import {mouseMoveAction, mouseStopMoveAction} from "./store/actionCreators";
import store from './store';

const root = document.getElementById('root');

let timer;
root.onmousemove = () => {
    store.dispatch(mouseMoveAction());
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        store.dispatch(mouseStopMoveAction())
    }, 5000)
};