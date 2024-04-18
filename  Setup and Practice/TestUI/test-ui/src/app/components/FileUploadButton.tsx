"use client";
import React, { useRef, useState } from "react";
import { Button, ButtonProps } from "../../../lib/mui";
import Confirmation from "./Confirmation";

// Define the type for the props
interface FileUploadButtonProps {}
interface FileUploadButtonProps extends ButtonProps {
  children: React.ReactNode;
  nature: string;
  userId: string;
}

function FileUploadButton({
  children,
  nature,
  userId,
  ...props
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file); // Debugging: log file info

      const formData = new FormData();
      formData.append("file", file); // 'file' is the key

      try {
        const response = await fetch("http://127.0.0.1:5000/upload/file", {
          method: "POST",
          body: formData,
          headers: {
            "User-ID": userId,
            Nature: nature,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("File uploaded successfully", data); // Process response data
          setUploadStatus({ success: true, message: "File uploaded successfully!" });
        } else {
          console.error(
            "Failed to upload file:",
            response.status,
            await response.text()
          );
          setUploadStatus({ success: false, message: "Failed to upload file." });
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

  };

  return (
    <>
    {uploadStatus && <Confirmation message={uploadStatus.message} />}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button className="p-[3px] relative" onClick={handleButtonClick}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200">
          {children}
        </div>
      </button>
    </>
  );
}

export default FileUploadButton;
