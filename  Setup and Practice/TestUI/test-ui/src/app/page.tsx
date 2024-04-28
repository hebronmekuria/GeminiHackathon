"use client";
import FileUploadButton from "./components/FileUploadButton";
import SubmitButton from "./components/SubmitButton";
import ResultDisplay from "./components/ResultDisplay";
import {
  AttachmentIcon,
  Avatar,
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
import { Vortex } from "./components/ui/vortex";
import { MovingBorderDemo } from "./components/ResetDBButton";
import { EvervaultCardDemo } from "./components/EverVault";

export default function Home() {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string>("");
  const [tabIndex, setTabIndex] = useState(0); // Tab index state

  const handleFetchSuccess = (fetchedData: any) => {
    setData(fetchedData);
    setError("");
    setTabIndex(1);
  };

  const handleFetchError = (errorMessage: string) => {
    setError(errorMessage);
    setData(null);
    setTabIndex(1);
  };
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <main style={{ minHeight: "100vh" }}>
      <ChakraProvider>
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="vortex-container"
          
        >
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab color={"white"}>Home</Tab>
              <Tab color={"white"}>Result</Tab>
              <Tab color={'white'}>Dashboard</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack>
                  <Heading as="h1" color="white" mt="65px" fontSize={"56px"}>
                    Gemini AI Grader
                  </Heading>
                  <div style={{ margin: "30px" }}>
                    <TypewriterEffectDemo />
                  </div>
                </VStack>
                <VStack spacing={10}>
                  <HStack>
                    <FileUploadButton
                      bg="#A045FC"
                      w="300px"
                      h="120px"
                      mt="65px"
                      userId="3"
                      nature="rubrik"
                    >
                      <HStack>
                        <AttachmentIcon boxSize={30} color={"white"} />
                        <Text fontSize={32} color="white">
                          Upload Rubrik
                        </Text>
                      </HStack>
                    </FileUploadButton>
                    <FileUploadButton nature='' userId="3"> <Text fontSize={32} color="white">Grade by Correctness </Text></FileUploadButton>
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
                      <AttachmentIcon boxSize={30} color={"white"} />
                      <Text fontSize={32} color="white">
                        Upload Assignment{" "}
                      </Text>
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
                <MovingBorderDemo/>
              </TabPanel>
              <TabPanel>
                <ResultDisplay data={data} error={error} />
              </TabPanel>
              <TabPanel>
                  <EvervaultCardDemo></EvervaultCardDemo>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Vortex>
      </ChakraProvider>
    </main>
  );
}
