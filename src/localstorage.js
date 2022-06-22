


/**
 * Gets the TextBench session information from the sessionStorage. This function gets
 * executed in production mode only. During the development, we set all the session info
 * in the login screen
 */
 export const loadTextBenchSession = () => {
    try {
        const serializedSession = sessionStorage.getItem('ls.session');
        
        if (serializedSession === null) {
            return undefined;
        }

        return JSON.parse(serializedSession);

    } catch (e) {
        return undefined;
    }
};

/**
 * Saves the updated queue in the sessionStorage. This is needed because the httpService uses
 * the queueName from the sessionStorage.
 * 
 * @param {String} queue the queue in string format. Ex: en.es.740 
 */
 export const updateTextBenchSession = (queue) => {
    try {
        const serializedSession = sessionStorage.getItem('ls.session');
        
        if (serializedSession === null) {
            return undefined;
        }

        let parsedSession = JSON.parse(serializedSession);
        parsedSession.queue = queue;

        sessionStorage.setItem('ls.session', JSON.stringify(parsedSession));

    } catch (e) {
        return undefined;
    }
}

/**
 * 
 * @returns true if user is authenticated
 */
export const isUserAuthenticated = () => {
    let isAuthenticated = false;

    try {
        const serializedSession = sessionStorage.getItem('ls.session');

        if (serializedSession === null) {
            return false;
        }

        const session = JSON.parse(serializedSession);

        if (session.token && session.userName) {
            isAuthenticated = true;
        }
        
    } catch (e) {
        isAuthenticated = false;
    }

    return isAuthenticated;
}