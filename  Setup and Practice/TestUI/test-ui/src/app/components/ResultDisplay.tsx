"use client";
import React from 'react';
import { Box, Text, VStack, ButtonProps } from '../../../lib/mui';


interface ResultDisplayProps extends ButtonProps {
  data?: any;        
  error?: string;    
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, error }) => {
  return (
    <VStack spacing={4}>
      {error && (
        <Box p={4} bg="red.200">
          <Text color="red.800">Error: {error}</Text>
        </Box>
      )}
      {data && (
        <Box p={4} bg="green.200">
          <Text color="green.800">Result: {JSON.stringify(data)}</Text>
        </Box>
      )}
    </VStack>
  );
}

export default ResultDisplay;
