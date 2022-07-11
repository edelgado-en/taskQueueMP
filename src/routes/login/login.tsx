import { useState, useEffect } from 'react';
import api from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormValues = {
  userName: string,
  password: string,
  queue: string
}

const Login = () => {
    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
        //reset redux state

        //set focus on username

    }, []);

    const onSubmit = handleSubmit((data: FormValues) => {
        handleLogin(data);
    })

    const handleLogin = async (data: FormValues) => {
        setLoading(true);

        const { userName, password, queue } = data;

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
            toast.error('Unable to login');
            setLoading(false);
        }

        if (tokenSuccessful) {

            try {
              const queueResponse = await api.get(`/queues/${queue}`);
              const userResponse = await api.get(`/users/${userName}`);
              
              const customerId = queue.substring(queue.lastIndexOf(".") + 1);
              const languagesResponse = await api.post(`/customerlanguages/${customerId}`);
  
              let queues: any = [];
  
              languagesResponse.data.forEach(function(language: any) {
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
  
              const targetCountry = {
  
              };
  
              //TODO: support country
             /*  if (body.targetCountry) {
                  targetCountry.code = body.targetCountry.code,
                  targetCountry.name = body.targetCountry.name
              } */
              
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
  
              setLoading(false);
  
              navigate('/');

            } catch (e) {
              toast.error('Unable to login')
              setLoading(false);
            }
            
        }
    }

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md mt-48">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to TMV2</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Development Mode
                </p>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
                  <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                      <label 
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          type="text"
                          {...register('userName', { required: 'Username is required' })}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300
                                    rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                                      focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        { errors.userName && <p className="text-red-500">{errors.userName.message}</p> }
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          type="password"
                          {...register('password', { required: 'Password is required' })}
                          className="appearance-none block w-full px-3 py-2 border
                                  border-gray-300 rounded-md shadow-sm placeholder-gray-400
                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        { errors.password && <p className="text-red-500">{errors.password.message}</p> }
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Queue
                      </label>
                      <div className="mt-1">
                        <input
                          id="queue"
                          type="text"
                          placeholder='en.es.938'
                          {...register('queue', { required: 'Queue is required' })}
                          className="appearance-none block w-full px-3 py-2 border
                                    border-gray-300 rounded-md shadow-sm placeholder-gray-400
                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        { errors.queue && <p className="text-red-500">{errors.queue.message}</p> }
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border
                                  border-transparent rounded-md shadow-sm text-sm font-medium
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {loading ? 'sigining in...' : 'Sign in'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </>
    )
}

export default Login;