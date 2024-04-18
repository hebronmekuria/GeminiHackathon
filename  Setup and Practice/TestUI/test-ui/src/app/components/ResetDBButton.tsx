import React, { useState } from 'react';
import { Button } from './ui/moving-border';
import { HStack, VStack, RepeatIcon } from "../../../lib/mui";
import UploadConfirmation from "./Confirmation";

export function MovingBorderDemo() {
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleResetClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/upload/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset database");
      }
      setMessage(data.message);
      setShowConfirmation(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "An unknown error occurred");
      setShowConfirmation(true);
    }
  };

  return (
    <div>
      <VStack align='start'>
      <Button
        borderRadius="3.75rem"
        className="bg-black dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        onClick={handleResetClick}
      >
        <HStack>
            <RepeatIcon boxSize={7} color={'white'}/>
        </HStack>
      </Button>
      <div>
      {showConfirmation && <UploadConfirmation message={message} />}
      </div>
      </VStack>
    </div>
    
  );
}
