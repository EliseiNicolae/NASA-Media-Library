import {Box, Button, Heading, Input, useToast} from '@chakra-ui/react'
import {useState} from "react";
import axios from "axios";

export default function Search() {
  const toast = useToast()
  const [text, setText] = useState<string>('');
  const [yearStart, setYearStart] = useState<string>('');
  const [yearEnd, setYearEnd] = useState<string>('');
  const [response, setResponse] = useState<any>([]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!text) return;
    axios.get(`https://images-api.nasa.gov/search?q=${text}${yearStart ? `&year_start=${yearStart}` : ''}${yearEnd ? `&year_end=${yearEnd}` : ''}`)
      .then(function (response) {
        setResponse(response)
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
          <Input type={"number"} value={yearStart} placeholder={"The start year for results"}
                 onChange={(e) => setYearStart(e.target.value)}/>
          <Input type={"number"} value={yearEnd} placeholder={"The end year for results"}
                 onChange={(e) => setYearEnd(e.target.value)}/>
          <Button type={"submit"}>Search</Button>
        </Box>
      </form>

    </Box>
  )
}