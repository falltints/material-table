import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_ALARM_DATA } from "./actionTyles";
import { initAlarmAction } from "./actionCreators";
import { $localtion } from "../common/js/config";

function* initAlarmData() {
    try {
        const res = yield axios.get($localtion.alarm);
        const action = initAlarmAction(res.data);
        yield put(action);
    } catch (e) {
        console.log(e)
    }
}

function* sagas() {
   yield takeEvery(GET_ALARM_DATA, initAlarmData);
}

export default sagas;