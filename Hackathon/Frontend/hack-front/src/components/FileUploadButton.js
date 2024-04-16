import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';

function FileUploadButton({ children, ...props }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);  // 'file' is the key expected on the server side
  
    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        body: formData,
      });
      const result = await response.text();  // Assuming the response is plain text
      console.log(result);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };
  

  
  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
      />
      <Button onClick={handleButtonClick} {...props}>
        {children}
      </Button>
    </>
  );
}

export default FileUploadButton;
