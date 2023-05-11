import {Box, Image} from "@chakra-ui/react";

export default function Results({data}: any) {
  return (
    <div>
      <h1>Results</h1>
      <Box display={"flex"} gap={50} flexDirection={"column"}>
        {data?.collection?.items
          .map((item: any, index: number) => {
            return (
              <Box key={`image-container-${index}`} maxW={500} display={"flex"} justifyContent={"center"}
                   alignItems={"center"} flexDirection={"column"}>
                {
                  item?.links?.map((link: any, index: number) => {
                    if (link?.render === "image") {
                      return (
                        <Box key={`image-${index}`} display={"flex"} justifyContent={"center"} alignItems={"center"} height={250} width={350}>
                          <Image src={link?.href} alt={"123"} loading={"lazy"} objectFit={"contain"}
                                 width={'100%'} height={"100%"}/>
                        </Box>
                      )
                    }
                  })
                }
                {
                  item?.data?.map((data: any, index: number) => {
                    return (
                      <div key={`description-${index}`}>
                        <h1>{data?.title}</h1>
                        <h1>{data?.location}</h1>
                        <h1>{data?.photographer}</h1>
                      </div>
                    )
                  })
                }
              </Box>
            )
          })}
      </Box>
    </div>
  )
}