"use client";
import Image from "next/image";
import { MacbookScrollDemo } from "./components/macbook";
import { AuroraBackground } from "./components/ui/aurora-background";
import FileUploadButton from "./components/FileUploadButton";
import SubmitButton from "./components/SubmitButton";
import ResultDisplay from "./components/ResultDisplay";
import UploadConfirmation from "./components/Confirmation";
import {
  AttachmentIcon,
  Box,
  ChakraProvider,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  VStack,
  HStack,
  Text,
} from "../../lib/mui";
import React, { useState } from "react";
import { TypewriterEffectDemo } from "./components/TypeWriter";
import { VortexDemoSecond } from "./components/Vortex";
import { Vortex } from "./components/ui/vortex";
import { IconBold } from "@tabler/icons-react";

export default function Home() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string>("");

  const handleFetchSuccess = (fetchedData: any) => {
    // Replace `any` with the specific type of fetchedData
    setData(fetchedData);
    setError(""); // Clear any existing errors
  };

  const handleFetchError = (errorMessage: string) => {
    setError(errorMessage);
    setData(null); // Clear any existing data
  };
  return (
    <main style={{ minHeight: "100vh" }}>
      <ChakraProvider>
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full min-h-screen" // min-h-screen to fill the height of the screen
        >
          <Tabs>
            <TabList>
              <Tab color={"white"}>Home</Tab>
              <Tab color={"white"}>About Me</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack>
                  <ResultDisplay data={data} error={error} />
                  <Heading as="h1" color="white" mt="65px" fontSize={"56px"}>
                    Gemini Grader
                  </Heading>
                  <div style={{ margin: "30px" }}>
                    <TypewriterEffectDemo />
                  </div>
                </VStack>
                <VStack spacing={10}>
                  <HStack>
                  <FileUploadButton
                    bg="#A045FC"
                    w="500px"
                    h="120px"
                    mt="65px"
                    userId="3"
                    nature="rubrik"
                  >
                    <HStack>
                      <AttachmentIcon boxSize={30} color={"white"}/>
                    <Text fontSize={32} color="white">Upload Rubrik</Text>
                    </HStack>
                  </FileUploadButton>
                  </HStack>
                  <FileUploadButton
                    bg="#5F6FFF"
                    w="700px"
                    h="120px"
                    mt="65px"
                    userId="3"
                    nature="essay"
                  >
                    <HStack>
                    <AttachmentIcon boxSize={30} color={"white"}/>
                    <Text fontSize={32} color="white" >Upload Essay </Text>
                    </HStack>
                  </FileUploadButton>
                  <SubmitButton
                    bg="black"
                    w="200px"
                    h="73px"
                    mt="65px"
                    color="white"
                    onFetchSuccess={handleFetchSuccess}
                    onFetchError={handleFetchError}
                    userId="3"
                    nature="rubrik"
                  >
                    <Text fontSize={20}>Submit</Text>
                  </SubmitButton>
                </VStack>
              </TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </Vortex>
      </ChakraProvider>
    </main>
  );
}
