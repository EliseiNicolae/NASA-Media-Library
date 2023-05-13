import {Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text} from "@chakra-ui/react";
import {Link} from 'react-router-dom';

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
          .map((item: any, card_index: number) => (
            <Card
              key={`card-${card_index}`}
              direction={{base: 'column-reverse', sm: 'row'}}
              overflow='hidden'
              variant='outline'
              mx={{base: 5, md: 10}}
              maxW={700}
            >
              {
                item?.data?.map((data: any, index: number) => (
                  <Stack key={`description-${index}`} w={'100%'}>
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
                item?.links?.map((link: any, index: number) => {
                  if (link?.render !== "image") return null;
                  return (
                    <Image
                      key={`image-${index}`}
                      objectFit='contain'
                      background={'#f9f9f9'}
                      src={link?.href}
                      w={{base: '100%', sm: '250px'}}
                      h={{base: '100%', sm: "250px"}}
                      objectPosition={'50% 50%'}
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