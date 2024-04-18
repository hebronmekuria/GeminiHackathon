import { HStack, CheckCircleIcon } from "../../../lib/mui";
import React from 'react';

interface UploadConfirmationProps {
  message: string;
}

const UploadConfirmation: React.FC<UploadConfirmationProps> = ({ message }) => {
  return (
    <div className="my-4 p-4 max-w-sm mx-auto bg-black rounded-lg shadow-xl text-center">
        <HStack>
            <CheckCircleIcon color={"white"}></CheckCircleIcon>
      <p className="text-white">{message}</p>
      </HStack>
    </div>
  );
};

export default UploadConfirmation;
