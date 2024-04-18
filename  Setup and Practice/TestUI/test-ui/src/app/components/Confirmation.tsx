import React from 'react';

interface UploadConfirmationProps {
  message: string;
}

const UploadConfirmation: React.FC<UploadConfirmationProps> = ({ message }) => {
  return (
    <div className="my-4 p-4 max-w-sm mx-auto bg-white rounded-lg shadow-xl text-center">
      <p className="text-black">{message}</p>
    </div>
  );
};

export default UploadConfirmation;
