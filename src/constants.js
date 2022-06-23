export const API_BASE_URL = 'https://local-api.dev.motionpoint.com:44443';

export const CONTROL_CENTER_LOGIN_URL = '/controlcenter/#/login';

export const DEV_SERVER_BASE_URL = 'http://localhost:3000/#/login';


export const STANDARD_DROPDOWN_STYLES = { 
    control: (provided) => ({
        ...provided,
        padding: '0px',
        borderColor: '#cbd3da',
        '&:hover': {
            borderColor: '#a2a8ae'
        },
        minHeight: '',
        maxHeight: '35px'
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '12px'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '1px'
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '12px'
    }),
    option: (provided) => ({
        ...provided,
        fontSize: '12px',
        paddingBottom: '5px',
        paddingTop: '5px'
      }),
      groupHeading: (provided) => ({
        ...provided,
        background: '#f2f4f7',
        paddingTop: '5px',
        paddingBottom: '5px'
    })
};

export const PAGE_SIZE_OPTIONS = [
    { value: 50, label: 'Show 50' },
    { value: 100, label: 'Show 100' },
    { value: 150, label: 'Show 150' },
    { value: 200, label: 'Show 200' }
]