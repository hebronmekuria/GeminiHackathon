import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';

function FileUploadButton({ children, ...props }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file); // Debugging: log file info

      // Prepare FormData to send the file
      const formData = new FormData();
      formData.append('file', file); // 'file' is the key

      try {
        const response = await fetch('http://127.0.0.1:5000/upload/file', {
          method: 'POST',
          body: formData,
          // Headers are set automatically by the browser when using FormData
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
