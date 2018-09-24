import store from './index';
import { INIT_ALARM_DATA, GET_ALARM_DATA } from "./actionTyles";

export const getAlarmAction = () => ({
    type: GET_ALARM_DATA
});

export const initAlarmAction = (data) => ({
    type: INIT_ALARM_DATA,
    data
});
