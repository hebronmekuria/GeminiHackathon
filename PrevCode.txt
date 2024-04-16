import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const App = () => {
  const [uploadingText, setUploadingText] = useState(false);

  const handleUpload = (isText) => {
    if (isText) {
      // Handle text upload logic
      console.log("Uploading text...");
    } else {
      // Handle rubric upload logic
      console.log("Uploading rubric...");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Upload Files</h1>

      <div style={{ marginBottom: "20px" }}>
        <Button color="danger" size="lg">
          Upload Rubric
        </Button>
        <Button
          variant="contained"
          color={uploadingText ? "default" : "secondary"}
          onClick={() => setUploadingText(true)}
          style={{ marginLeft: "10px" }}
        >
          Upload Text
        </Button>
      </div>

      {uploadingText ? (
        <div>
          {/* Additional components for text upload */}
          <input type="file" accept=".txt" />
          <Button variant="contained" onClick={() => handleUpload(true)}>
            Upload Text File
          </Button>
        </div>
      ) : (
        <div>
          {/* Additional components for rubric upload */}
          <input type="file" accept=".pdf" />
          <Button variant="contained" onClick={() => handleUpload(false)}>
            Upload Rubric PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
