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