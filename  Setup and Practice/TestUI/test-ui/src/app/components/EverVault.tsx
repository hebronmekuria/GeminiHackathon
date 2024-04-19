import React, { useState } from "react";
import { Box, HStack } from "../../../lib/mui";
import { EvervaultCard } from "./ui/evervault-card";

export function EvervaultCardDemo() {
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async (nature: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/upload/files?user_id=3&nature=${nature}`);
      const data = await response.json();
      if (response.ok) {
        setFilePaths(data.file_paths);
      } else {
        throw new Error(data.error || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilePaths([]);
    }
    setLoading(false);
  };

  return (
    <div className="dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <EvervaultCard text="Dashboard" />
      <HStack spacing={15}>
        <button
          className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
          onClick={() => fetchFiles('rubrik')}
        >
          View Rubriks
        </button>
        <button
          className="px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
          onClick={() => fetchFiles('essay')}
        >
          View Assignments
        </button>
      </HStack>
      <Box className="w-full mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-none p-0">
            {filePaths.map((path, index) => (
              <li key={index} className="p-2 mb-2 bg-gray-100 rounded shadow">
                {path}
              </li>
            ))}
          </ul>
        )}
      </Box>
    </div>
  );
}
