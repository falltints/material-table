import { INIT_ALARM_DATA } from "./actionTyles";

const defaultState = {
    alarm: []
};

export default (state = defaultState, actions) => {
    if (actions.type === INIT_ALARM_DATA) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.alarm = actions.data;
        return newState;
    }
    return state;
}