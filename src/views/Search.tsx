import {
  Box,
  Button,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast
} from '@chakra-ui/react'
import {useMemo, useState} from "react";
import axios from "axios";
import Results from "../components/Search/Results";

export default function Search() {
  const toast = useToast()
  const [text, setText] = useState<string>('');
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [nasaData, setNasaData] = useState<any>([]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} mt={50}>
      <Heading mb={15}>Search</Heading>
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

      {useMemo(() => <Results data={nasaData}/>, [nasaData])}
    </Box>
  );
}