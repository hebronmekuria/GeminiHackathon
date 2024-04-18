// ResultDisplay.tsx
"use client";
import React from 'react';
import { Box, Text, VStack, ButtonProps } from '../../../lib/mui';

interface ResultDisplayProps extends ButtonProps {
  data?: any;
  error?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, error }) => {
  // Custom function to format the data
  const formatData = (data: any) => {
    if (!data) return "No data available.";

    // Check if data is an object and handle it accordingly
    if (typeof data === 'object' && data !== null) {
      // Create a readable string from key-value pairs
      return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
    }
    
    // If data is a string or other format, return it directly
    return data;
  };

  return (
    <VStack spacing={4}>
      {error && (
        <Box p={4} bg="red.200">
          <Text color="red.800" fontWeight="bold">Error: {error}</Text>
        </Box>
      )}
      {data && (
        <Box p={4} bg="white" w='100%' h='100%'>
          <Text fontFamily={'sans-serif'} color="black" fontWeight="bold" whiteSpace="pre-wrap">
            Result: {formatData(data)}
          </Text>
        </Box>
      )}
    </VStack>
  );
}

export default ResultDisplay;
