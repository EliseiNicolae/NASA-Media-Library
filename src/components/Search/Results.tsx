import {Box, Image} from "@chakra-ui/react";

export default function Results({data}: any) {
  console.log("data", data)
  return (
    <div>
      <h1>Results</h1>
      {data?.collection?.items
        .map((item: any, index: number) => {
          return (
            <>
              {
                item?.links?.map((link: any, index: number) => {
                  if (link?.render === "image") {
                    return (
                      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={350} width={350}>
                        <Image key={index} src={link?.href} alt={"123"} loading={"lazy"} objectFit={"contain"}
                               width={'100%'} height={"100%"}/>
                      </Box>
                    )
                  }
                })
              }
            </>
          )
        })}
    </div>
  )
}