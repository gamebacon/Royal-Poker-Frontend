import React from 'react';
import propTypes from 'prop-types';


const SignInOption = ({icon, text, onClick}) => {
    return (
        <button
            className='flex items-center justify-center border rounded-2xl p-1 w-full
            space-x-4 hover:opacity-60 transition-all hover:bg-gray-50'
            onClick={onClick}
        >
            {icon}
            <span>{text}</span>
        </button>
    )
}

SignInOption.propTypes = {
    icon: propTypes.any.isRequired,
    text: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
}

export default SignInOption;

