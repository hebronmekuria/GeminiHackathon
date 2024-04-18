import "./App.css";
import React, { useState } from 'react';
import { Box, VStack, Heading, Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import FileUploadButton from "./components/FileUploadButton";
import SubmitButton from "./components/SubmitButton";
import ResultDisplay from "./components/ResultDisplay"

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const handleFetchSuccess = (fetchedData) => {
    setData(fetchedData);
    setError('');  // Clear any existing errors
  };

  const handleFetchError = (errorMessage) => {
    setError(errorMessage);
    setData(null);  // Clear any existing data
  };
  return (
    <div className="App">
      <Box as="section" boxShadow="outline" bg="black" w="100%" h="100%">
        <Tabs>
          <TabList>
            <Tab color={'white'}>Home</Tab>
            <Tab color={'white'}>About Me</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack>
                <Heading as="h1" color="white" mt="65px" fontSize={"56px"}>
                  Gemini Grader
                </Heading>
                <Heading
                  as="h2"
                  color="white"
                  mt="65px"
                  ms="30px"
                  me="30px"
                  fontWeight={"normal"}
                  fontSize={"32px"}
                >
                  Easy auto grading for open ended assignments and papers.
                </Heading>
              </VStack>
              <VStack>
                <FileUploadButton bg="#A045FC" w="500px" h="120px" mt="65px" userId="3" nature="rubrik">
                  <Heading color="white">Click Me</Heading>
                </FileUploadButton>
                <FileUploadButton bg="#5F6FFF" w="700px" h="120px" mt="65px" userId="3" nature="essay">
                  <Heading color="white">Click Me</Heading>
                </FileUploadButton>
                <SubmitButton bg="black" w="200px" h="73px" mt="65px" color="white" onFetchSuccess={handleFetchSuccess} onFetchError={handleFetchError}  >
                  <Heading>Click Me</Heading>
                </SubmitButton>
              </VStack>
            </TabPanel>
            <TabPanel>
              <ResultDisplay data={data} error={error} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default App;
