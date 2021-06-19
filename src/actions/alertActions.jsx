import { 
    SHOW_ALERT,
    HIDE_ALERT
} from '../types';

export function showAlertAction(alert) {
    return (dispatch) => {
        dispatch(showAlert(alert))
    }
}

export function hideAlertAction() {
    return (dispatch) => {
        dispatch(hideAlert())
    }
}

const showAlert = alert => ({
    type: SHOW_ALERT,
    payload: alert
});

const hideAlert = () => ({
    type: HIDE_ALERT
})