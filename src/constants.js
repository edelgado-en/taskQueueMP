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

export const STANDARD_MULTI_DROPDOWN_STYLES = {
    control: (provided) => ({
        ...provided,
        borderColor: '#cbd3da',
        '&:hover': {
            borderColor: '#a2a8ae'
        }
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "90%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "initial"
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '12px'
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: 'rgb(0, 184, 217)',
        backgroundColor: '#e5f7fb',
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: 'rgb(0, 184, 217)',
        backgroundColor: '#e5f7fb',
        ':hover': {
          backgroundColor: '#7fdbec',
          color: 'white',
        },
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
}

export const FORMAT_GROUP_LABEL = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

export const PAGE_SIZE_OPTIONS = [
    { value: 50, label: 'Show 50' },
    { value: 100, label: 'Show 100' },
    { value: 150, label: 'Show 150' },
    { value: 200, label: 'Show 200' }
]

const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};

const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
};

