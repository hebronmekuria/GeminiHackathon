import React from 'react';

interface UploadConfirmationProps {
  message: string;
}

const UploadConfirmation: React.FC<UploadConfirmationProps> = ({ message }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-xl text-center">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default UploadConfirmation;
