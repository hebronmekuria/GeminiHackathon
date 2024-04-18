"use client";
import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface SubmitButtonProps extends ButtonProps {
  userId: string;
  nature: string;
  onFetchSuccess: (data: any) => void;
  onFetchError: (errorMessage: string) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children, 
  userId, 
  nature, 
  onFetchSuccess, 
  onFetchError, 
  ...props
}) => {
    const handleButtonClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/upload/process', {
                method: 'POST',
                headers: {
                    'User-ID': userId,
                    'Nature': nature
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch');
            }
            onFetchSuccess(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                onFetchError(error.message);
            } else {
                onFetchError('An unknown error occurred');
            }
        }
    };

    return (

        <button className="p-[3px] relative" onClick={handleButtonClick}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          {children}
        </div>
        </button>
        
    );
}

export default SubmitButton;
