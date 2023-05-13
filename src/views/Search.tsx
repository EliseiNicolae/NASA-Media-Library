import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  Text,
  useToast
} from '@chakra-ui/react'
import {useState} from "react";
import axios from "axios";
import Results from "../components/Search/Results";

export default function Search() {
  const toast = useToast()
  const [text, setText] = useState<string>('');
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [nasaData, setNasaData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setIsLoading(true)
    e.preventDefault();
    if (!text) return;
    axios.get(`https://images-api.nasa.gov/search?q=${text}${yearStart ? `&year_start=${yearStart}` : ''}${yearEnd ? `&year_end=${yearEnd}` : ''}`)
      .then(function (response) {
        setNasaData(response.data)
      })
      .catch(function (error) {
        toast({
          title: `An error occurred. Unable to search.`,
          description: error.response.data.reason,
          status: "error",
          duration: 9000,
        })
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} mt={50}>
      <Heading display={"flex"} gap={2} mb={50}>
        <Text>Search</Text>
        <img
          src={"./nasa_logo.png"}
          alt='Caffe Latte'
          loading={"lazy"}
          width={40}
        />
        <Text>events</Text>
      </Heading>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} maxW={250} gap={5}>
          <Input value={text} placeholder={"Text"}
                 onChange={(e) => setText(e.target.value)} required/>

          <NumberInput value={yearStart} min={1} onChange={(e) => setYearStart(e)}
                       max={new Date().getFullYear()}>
            <NumberInputField placeholder={"The start year for results."}/>
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>

          <NumberInput min={1} max={new Date().getFullYear()} value={yearEnd}
                       onChange={(e) => setYearEnd(e)}>
            <NumberInputField placeholder={"The end year for results"}/>
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
          <Button type={"submit"} mt={2}>Search</Button>
        </Box>
      </form>

      <Divider my={5}/>
      {isLoading ? <Grid w={'100%'} height={'100%'} px={{base: 5, md: 10}} gap={50} maxW={700}>
          <Skeleton h={162}/>
          <Skeleton h={162}/>
          <Skeleton h={162}/>
          <Skeleton h={162}/>
          <Skeleton h={162}/>
        </Grid>
        :
        <Results data={nasaData}/>
      }
    </Box>
  );
}