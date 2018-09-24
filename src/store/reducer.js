import { INIT_ALARM_DATA, MOUSE_MOVE, MOUSE_STOP_MOVE } from "./actionTyles";

const defaultState = {
    mouseMove: false,
    alarm: []
};

export default (state = defaultState, actions) => {
    if (actions.type === INIT_ALARM_DATA) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.alarm = actions.data;
        return newState;
    }
    if (actions.type === MOUSE_MOVE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.mouseMove = true;
        return newState;
    }
    if (actions.type === MOUSE_STOP_MOVE) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.mouseMove = false;
        return newState;
    }
    return state;
}