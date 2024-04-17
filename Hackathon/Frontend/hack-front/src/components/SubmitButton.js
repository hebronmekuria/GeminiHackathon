import React from 'react';
import { Button } from '@chakra-ui/react';

function SubmitButton({ children, userId, nature, onFetchSuccess, onFetchError, ...props }) {
    // Define the function to handle the button click
    const handleButtonClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/upload/process', {
                method: 'POST',
                headers: {
                    'User-ID': '3',  // Assume this is provided or managed globally
                    'Nature': 'rubrik'  // Same as above
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch');
            }
            onFetchSuccess(data);
        } catch (error) {
            onFetchError(error.message);
        }
    };

    return (
        <Button onClick={handleButtonClick} {...props}>
            {children}
        </Button>
    );
}

export default SubmitButton;
