import React from 'react';
import propTypes from 'prop-types';
import SignInOption from './SignInOption';
import { AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';



const LoginModal = ({onSubmit}) => {
    const signInOptions = [
        {
            icon: <FcGoogle
                size={32}
            />,
            type: 'Google',
            onClick: () => onSubmit(),
        },
        {
            icon: <AiOutlineMail
                size={32}
            />,
            type: 'Email',
            onClick: () => onSubmit(),
        }
    ]

    return (
        <div
            className='
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            max-w-[500px] max-h-[800px] border
            h-full w-full shadow-lg rounded-md p-10'
        >
            <div
                className='flex flex-col justify-center text-center'
            >
                <h2
                    className='opacity-50 mb-10'
                >Sign in below with</h2>
                <ol
                    className='space-y-2 w-full'
                >
                {signInOptions.map((option, idx) => 
                    <SignInOption
                        key={idx}
                        icon={option.icon}
                        text={`${option.type}`}
                        onClick={option.onClick}
                    />
                )}
                </ol>
            </div>
        </div>
    )
};

LoginModal.propTypes = {
    onSubmit: propTypes.func.isRequired,
}

export default LoginModal;