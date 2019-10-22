import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Verify token and load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        // ping route for verifying tokens
        // this route isn't created yet so tokens will be removed if they navigate away from register page
        const res = await axios.get('/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// make register request with axios
// configuration for headers and body of request
// dispatch action based on response and display alert errors if any

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/auth/signup', body, config);
        console.log(res.data);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}