import React from 'react';
import propTypes from 'prop-types';
import SignInOption from './SignInOption';
import { AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { GiPokerHand } from 'react-icons/gi';
import { BiCopyright } from 'react-icons/bi';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';



const LoginModal = ({onSubmit}) => {
    const signInOptions = [
        {
            icon: <FcGoogle
                size={20}
            />,
            type: 'Google',
            onClick: () => onSubmit(),
        },
        {
            icon: <FaFacebook
                size={20}
            />,
            type: 'Facebook',
            onClick: () => onSubmit(),
        },
        {
            icon: <BsTwitterX
                size={20}
            />,
            type: 'Twitter',
            onClick: () => onSubmit(),
        },
    ]

    return (
        <div
            className='bg-white
            absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            max-w-[500px] max-h-[800px]  w-1/3 h-1/2
            border mt-20
            h-fit w-full shadow-lg rounded-2xl p-10'
        >
            <div
                className='flex flex-col justify-center text-center items-center'
            >
                <h1
                    className='text-xl xl:text-3xl font-bold relative'
                >Royalpoker.org
                <BiCopyright
                    className='absolute -right-4 -top-1'
                    style={{
                        width: '10%',
                        height: '50%'
                      }}
                />
                </h1>
                <GiPokerHand
                    className='size-48'
                />
            </div>
            <div
                className='flex flex-col justify-center text-center'
            >
                <h2
                    className='opacity-50 mb-4 text-sm'
                >Sign in to play</h2>
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
            <aside
                className='mt-6'
            >
                <a
                    className='text-xs text-blue-600 underline'
                    target='_blank'
                    href='https://google.com' rel="noreferrer"
                >Need help?</a>
            </aside>
            </div>
        </div>
    )
};

LoginModal.propTypes = {
    onSubmit: propTypes.func.isRequired,
}

export default LoginModal;