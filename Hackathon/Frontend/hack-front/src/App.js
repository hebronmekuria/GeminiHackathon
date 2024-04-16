import "./App.css";
import { Button, Box, Image, VStack, Heading, Text, Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import toppurple from "./icons/top-purple.png";
import topblue from "./icons/top-blue.png";
import FileUploadButton from "./components/FileUploadButton";

function App() {
  return (
    <div className="App">
      <Box as="section" boxShadow="outline" bg="black" w="100%" h="100%">
        {/* <Image src={toppurple} w="395px" h="261px"/>
        <Image src={topblue}  w="395px" h="261px"/> */}
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
            Easy auto grading for any open ended assignments and papers.
          </Heading>
        </VStack>

        <VStack>
          <FileUploadButton bg="#A045FC" w="500px" h="120px" mt="65px">
            <Heading color="white">Click Me</Heading>
          </FileUploadButton>
          <FileUploadButton bg="#5F6FFF" w="700px" h="120px" mt="65px">
            <Heading color="white">Click Me</Heading>
          </FileUploadButton>
          <Button bg="black" w="200px" h="73px" mt="65px" color="white">
            <Heading>Click Me</Heading>
          </Button>
        </VStack>
            </TabPanel>
            <TabPanel>

            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </Box>
    </div>
  );
}

export default App;
