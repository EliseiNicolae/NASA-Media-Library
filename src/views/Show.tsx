import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Box, Button, Card, CardBody, Divider, Heading, Image, Stack, Text, useToast} from "@chakra-ui/react";
import {Context} from "../context/ContextProvider";
import axios from "axios";

export default function Show() {
  const toast = useToast();
  const {ctx} = useContext(Context);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nasaContent, setNasaContent] = useState<any>([]);
  const searchParams = new URLSearchParams(location.search);
  const nasaIdParam = decodeURIComponent(searchParams.get('nasa_id') || "");

  useEffect(() => {
    setIsLoading(true);
    const contentFromContext = ctx?.nasaData?.collection?.items.find((item: any) => {
      if (item.data[0].nasa_id === nasaIdParam) {
        return item
      }
      return false
    });

    if (contentFromContext) {
      setIsLoading(false)
      return setNasaContent(contentFromContext)
    }

    axios.get(`https://images-api.nasa.gov/search?nasa_id=${nasaIdParam}`)
      .then(function (response) {
        setNasaContent(response.data.collection.items[0])
      })
      .catch(function (error) {
        toast({
          title: `An error occurred. Unable to see the card details.`,
          description: error.response.data.reason,
          status: "error",
          duration: 9000,
        })
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [nasaIdParam, toast])

  const CardDetails = (nasaContent: any) => {
    if (!nasaContent?.data) {
      return <Text>No results found!</Text>
    }

    return (
      <Card
        overflow='hidden'
        variant='outline'
      >
        {
          nasaContent?.data?.map((data: any, index: number) => {
            return (
              <Stack key={`description-${index}`}>
                <CardBody>
                  <Heading size='md'>{data?.title}</Heading>
                  <Divider my={2}/>
                  {data?.location && <Text py={2}>
                    <b>Location</b>: {data?.location}
                  </Text>}
                  {data?.photographer && <Text><b>Photographer</b>: {data?.photographer}</Text>}
                  {data?.description && <Text><b>Description</b>: {data?.description}</Text>}
                  {data?.keywords && <Text><b>Keywords</b>: {data?.keywords.join(", ")}</Text>}
                  {data?.date_created && <Text><b>Created</b>: {data?.date_created}</Text>}

                </CardBody>
              </Stack>
            )
          })
        }
        {
          nasaContent?.links?.map((link: any, index: number) => {
            if (link?.render !== "image") {
              return null;
            }

            return (
              <Image
                key={`image-${index}`}
                objectFit='contain'
                src={link?.href}
                alt='Caffe Latte'
                loading={"lazy"}
                fallbackSrc={"https://via.placeholder.com/150"}
              />
            )
          })
        }
      </Card>
    )
  }

  return (
    <div>
      <Box display={"flex"}
           flexDirection={{base: "column", md: "row"}}
           gap={10}
           mx={{base: 10, md: "auto"}}
           my={{base: 10, md: 20}}
           maxW={700}>
        <Link to={"/search"}>
          <Button w={'fit-content'}>
            ⬅️ Back
          </Button>
        </Link>

        {isLoading ? <Text>Loading...</Text> : <CardDetails {...nasaContent} />}
      </Box>
    </div>
  );
}