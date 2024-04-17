"use client";
import React, { useRef } from 'react';
import { Button, ButtonProps } from '../../../lib/mui';

// Define the type for the props
interface FileUploadButtonProps {

}
interface FileUploadButtonProps extends ButtonProps {
    children: React.ReactNode;
    nature: string;
    userId: string;
  }

function FileUploadButton({ children, nature, userId, ...props }: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file); // Debugging: log file info

      const formData = new FormData();
      formData.append('file', file); // 'file' is the key

      try {
        const response = await fetch('http://127.0.0.1:5000/upload/file', {
          method: 'POST',
          body: formData,
          headers: {
            'User-ID': userId,
            'Nature': nature
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('File uploaded successfully', data); // Process response data
        } else {
          console.error('Failed to upload file:', response.status, await response.text());
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button onClick={handleButtonClick} {...props}>
        {children}
      </Button>
    </>
  );
}

export default FileUploadButton;
