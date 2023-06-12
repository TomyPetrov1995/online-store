import React from 'react';

const Input = ({
    type = "",
    name = "",
    onChange = ()=> null,
    placeholder = "",
    className = "",
    defaultValue = "",
    autoComplete = "",
    required = ""
               }) => {
    return (
        <div className={className}>
            <input
                type={type}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                defaultValue={defaultValue}
                autoComplete={autoComplete}
                required={required}/>
        </div>
    );
};

export default Input;