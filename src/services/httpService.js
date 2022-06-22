import axios from 'axios';

import { loadTextBenchSession } from '../localstorage';
import { API_BASE_URL,
         CONTROL_CENTER_LOGIN_URL,
         DEV_SERVER_BASE_URL
       } from '../constants';

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
    if (!config.url.endsWith('token')) {
        const tpmSession = loadTextBenchSession();
        
        if (tpmSession) {
            //do not include queue as a header for QueueEndpoint
            if (config.url.includes('/queues/')) {
                config.headers = {
                    'Authorization': tpmSession.token,
                    'X-MotionCore-UserName': tpmSession.userName
                }

            } else {
                config.headers = {
                    'Authorization': tpmSession.token,
                    'X-MotionCore-Queue': tpmSession.queue,
                    'X-MotionCore-UserName': tpmSession.userName
                }
            }
        }
    } 

    return config;

  }, (error) => {
        return Promise.reject(error);
  });


// the first argument refers to the request
// and we don't want to intercept the request for now
axios.interceptors.response.use(null, (error) => {    
    // unauthorized
    if (error.response.status === 401) {
        if (process.env.NODE_ENV === 'production') {
             window.location = CONTROL_CENTER_LOGIN_URL;

        } else if (process.env.NODE_ENV === 'development') {
            if (!error.response.request.responseURL.endsWith('token')) {
                window.location = DEV_SERVER_BASE_URL;
            }
        }
    }

    const expectedError = 
        error.response &&
        error.response.status >= 400
        && error.response.status < 500;

    if (!expectedError) {
        //TODO: SETUP TOAST
        //toast.error('An unexpected error occurred');
    }

    // this will return control to the caller
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}