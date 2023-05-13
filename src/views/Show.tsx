import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Card, CardBody, Heading, Image, Stack, Text, useToast} from "@chakra-ui/react";

export default function Show() {
  const toast = useToast()
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nasaContent, setNasaContent] = useState<any>([]);
  const searchParams = new URLSearchParams(location.search);
  const nasaIdParam = decodeURIComponent(searchParams.get('nasa_id') || "");

  useEffect(() => {
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
  }, [])

  return (
    <div>
      <Box display={"flex"}
           flexDirection={"column"}
           gap={10}
           mx={{base: 10, md: "auto"}}
           my={{base: 10, md: 20}}
           maxW={700}>
        <Button w={'fit-content'}>
          <Link to={"/search"}>Back</Link>
        </Button>
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

                    {data?.location && <Text py={2}>
                      Location: {data?.location}
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
                  objectFit='cover'
                  src={link?.href}
                  w={{base: '100%'}}
                  alt='Caffe Latte'
                  loading={"lazy"}
                  fallbackSrc={"https://via.placeholder.com/150"}
                />
              )
            })
          }
        </Card>
      </Box>
    </div>
  );
}