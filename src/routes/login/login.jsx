import { useEffect, useState } from 'react';
import api from '../../services/httpService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [queue, setQueue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
        //reset redux state

        //set focus on username

    }, []);

    const handleLogin = async () => {
        console.log(userName, password, queue);

        // Base64 encode
        const encodedCredentials = window.btoa(`${userName} ${password}`);

        let tokenSuccessful = false;
        let token = '';

        try {
            const { data } = await api.get('/token', { headers: { Authorization: encodedCredentials } });

            token = data.ciphertext;

            const sessionInfo = {
                token,
                userName,
                queue
            }

            // ls.session is the name used in the other Motioncore bench applications
            sessionStorage.setItem('ls.session', JSON.stringify(sessionInfo));

            //save in redux state
            //saveToken(sessionInfo);

            tokenSuccessful = true;

        } catch (e) {
            //toast.error('Unable to login'); //TODO: SETUP TOAST
            console.log(e);
            
        }

        if (tokenSuccessful) {
            const queueResponse = await api.get(`/queues/${queue}`);
            const userResponse = await api.get(`/users/${userName}`);
            
            const customerId = queue.substring(queue.lastIndexOf(".") + 1);
            const languagesResponse = await api.post(`/customerlanguages/${customerId}`);

            let queues = [];

            languagesResponse.data.forEach(function(language) {
                const value = language.queueName.toLowerCase();
                const label = language.sourceLanguageName + ' - '
                             + language.targetLanguageName
                             + (language.targetCountryName ? ' - ' + language.targetCountryName : '');  
                
                queues.push({ value, label });
            });

            const body = queueResponse.data;
            const userData = userResponse.data;

            const names = userData.name.split(' ');
            let initials = names[0].substring(0, 1).toUpperCase();
                
            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }

            const userInfo = {
                name: userData.name,
                userInitials: initials,
                email: userData.email,
                accessLevelId: userData.accessLevel.id,
                accessLevelName: userData.accessLevel.name
            }

            const sourceLanguage = {
                code: body.sourceLanguage.code,
                name: body.sourceLanguage.name
            }

            const targetLanguage = {
                code: body.targetLanguage.code,
                name: body.targetLanguage.name
            }

            const targetCountry = {};

            if (body.targetCountry) {
                targetCountry.code = body.targetCountry.code,
                targetCountry.name = body.targetCountry.name
            }
            
            const customer = {
                customerId: customerId,
                companyName: body.customer.companyName
            }

            const project = {
                name: body.customer.companyName,
                sourceLanguage,
                targetLanguage,
                targetCountry,
                isCustomerUser: false,
                customer
            }

            const sessionInfo = {
                name: userData.name,
                userId: userData.id,
                token,
                queue,
                queues,
                userName,
                project,
                userInfo,
                languagePairs: languagesResponse.data,
                role: userData.accessLevel.name,
                friendlyUserRole: userData.accessLevel.name
            };

            //TODO: DISPATCH THE SESSIONINFO TO REDUX SO THAT OYU CAN ACCESS FROM ANYWHERE

            // ls.session is the name used in the other Motioncore bench applications
            sessionStorage.setItem('ls.session', JSON.stringify(sessionInfo));

            navigate('/');

        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleNewUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleNewQueueChange = (event) => {
        setQueue(event.target.value);
    }

    return (
        <div className="form">
                <div className="form__form-group">
                    <span className="form__form-group-label">Username</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <i className="fa fa-user-o"></i>
                        </div>
                        <input name="userName"
                               id="userName"
                               type="text"
                               placeholder="UserName"
                               spellCheck="false"
                               value={userName}
                               onChange={handleNewUserNameChange}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">Password</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <i className="fa fa-key"></i>
                        </div>
                        <input name="password"
                               type={showPassword ? 'text' : 'password'}
                               placeholder="Password"
                               spellCheck="false"
                               value={password}
                               onChange={handleNewPasswordChange}
                        />
                        <button
                            className={`form__form-group-button${showPassword ? ' active' : ''}`}
                            onClick={handleShowPassword}>
                            <i className="fa fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">Queue</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <i className="fa fa-tasks"></i>
                        </div>
                        <input name="queue"
                            type="text"
                            placeholder="en.es.5"
                            spellCheck="false"
                            value={queue}
                            onChange={handleNewQueueChange}
                        />
                    </div>
                </div>
                <button className="btn btn-primary account__btn account__btn--small"
                        style={{ marginTop: '10px' }}
                        onClick={handleLogin}
                        disabled={userName.trim().length === 0 || password.trim().length === 0 || queue.trim().length === 0}>
                    Sign In
                </button>
            </div>
    )
}

export default Login;