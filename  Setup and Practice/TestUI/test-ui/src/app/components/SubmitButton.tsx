"use client";
import React, { useState } from 'react';
import { Button, ButtonProps, Spinner } from '@chakra-ui/react';

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
    const [isLoading, setIsLoading] = useState(false);  // State to track loading

    const handleButtonClick = async () => {
        setIsLoading(true); // Start loading
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
        setIsLoading(false); // Stop loading
    };

    return (
        <>
        <Button {...props} onClick={handleButtonClick} isLoading={isLoading} loadingText="Processing...">
          {isLoading ? <Spinner /> : children}
        </Button>
        </>
    );
}

export default SubmitButton;

