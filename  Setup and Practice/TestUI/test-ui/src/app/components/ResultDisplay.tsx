// ResultDisplay.tsx
"use client";
import React from 'react';
import { Box, Text, VStack, ButtonProps, Heading } from '../../../lib/mui';
import { motion } from "framer-motion";
import { AuroraBackground } from './ui/aurora-background';

interface ResultDisplayProps extends ButtonProps {
  data?: any;
  error?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, error }) => {
  const formatData = (data: any) => {
    if (!data) return "No data available.";
    if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
    }
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
        <AuroraBackground width={'100%'} cellPadding={30}>
          <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="relative flex flex-col gap-4 items-stretch justify-center p-4 flex-1"
            >
            <Heading mt={200} mb={4}>Final Grade</Heading>
            <Text color="black" whiteSpace="pre-wrap">
             {formatData(data)}
            </Text>
          </motion.div>
        </AuroraBackground>
      )}
    </VStack>
  );
}

export default ResultDisplay;
