import {Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text} from "@chakra-ui/react";
import {Link} from 'react-router-dom';

export default function Results({data}: any) {
  return (
    <div>
      <Box display={"flex"} gap={50} flexDirection={"column"}>

        {data?.collection?.items
          .map((item: any, index: number) => {
            return (
              <Card
                key={`card-${index}`}
                direction={{base: 'column', sm: 'row'}}
                overflow='hidden'
                variant='outline'
                mx={{base: 5, md: 10}}
                maxW={700}
              >
                {
                  item?.links?.map((link: any, index: number) => {
                    if (link?.render === "image") {
                      return (
                        <Image
                          key={`image-${index}`}
                          objectFit='cover'
                          src={link?.href}
                          w={{base: '100%', sm: '200px'}}
                          alt='Caffe Latte'
                          loading={"lazy"}
                          fallbackSrc={"https://via.placeholder.com/150"}
                        />
                      )
                    }
                    return null;
                  })
                }

                {
                  item?.data?.map((data: any, index: number) => {
                    return (
                      <Stack key={`description-${index}`}>
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
                    )
                  })
                }
              </Card>
            )
          })}
      </Box>
    </div>
  )
}