import {Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text} from "@chakra-ui/react";
import {Link} from 'react-router-dom';
import {INasaCardDetails, INasaDescription, INasaImage} from "../../models/NASA";

export default function Results({data}: any) {
  if (data.length === 0) {
    return null;
  }

  if (!data?.collection?.items?.length) {
    return <Text>No results found!</Text>
  }

  return (
    <div>
      <Box display={"flex"} gap={50} flexDirection={"column"}>
        {data?.collection?.items
          .map((item: INasaCardDetails, card_index: number) => (
            <Card
              key={`card-${card_index}`}
              direction={{base: 'column-reverse', md: 'row'}}
              overflow='hidden'
              variant='outline'
              mx={{base: 5, md: 10}}
              maxW={700}
            >
              {
                item?.data?.map((data: INasaDescription, index: number) => (
                  <Stack key={`description-${index}`} w={{base: '100%', md: 'calc(100% - 250px)'}}>
                    <CardBody>
                      <Heading size='md'>{data?.title}</Heading>

                      {data?.location && <Text py={2}>
                        Location: {data?.location}
                      </Text>}
                      {data?.photographer && <Text>Photographer: {data?.photographer}</Text>}
                    </CardBody>

                    <CardFooter>
                      <Link to={`/show?nasa_id=${data.nasa_id}`}>
                        <Button variant='solid' colorScheme='blue' mr={2}>
                          See more
                        </Button>
                      </Link>
                    </CardFooter>
                  </Stack>
                ))
              }
              {
                item?.links?.map((link: INasaImage, index: number) => {
                  if (link?.render !== "image") return null;
                  return (
                    <Image
                      key={`image-${index}`}
                      objectFit='contain'
                      background={'#f9f9f9'}
                      src={link?.href}
                      w={{base: '100%', md: '250px'}}
                      h={{base: '250px'}}
                      alt={`Image nasa ${card_index}`}
                      loading={"lazy"}
                    />
                  )
                })
              }
            </Card>
          ))}
      </Box>
    </div>
  )
}