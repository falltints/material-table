import store from './index';
import {
    INIT_ALARM_DATA,
    GET_ALARM_DATA,
    MOUSE_MOVE,
    MOUSE_STOP_MOVE
} from "./actionTyles";

export const getAlarmAction = () => ({
    type: GET_ALARM_DATA
});

export const initAlarmAction = (data) => ({
    type: INIT_ALARM_DATA,
    data
});

export const mouseMoveAction = () => ({
    type: MOUSE_MOVE
});

export const mouseStopMoveAction = () => ({
    type: MOUSE_STOP_MOVE
});
