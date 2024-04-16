import React, { useRef } from 'react';
import { Button } from '@chakra-ui/react';

function FileUploadButton({ children, ...props }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
            console.log(file); // handle file processing here
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
