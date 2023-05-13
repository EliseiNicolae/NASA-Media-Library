import {Grid, Skeleton} from "@chakra-ui/react";

const Loading = () => {
  return <Grid w={'100%'} height={'100%'} px={{base: 5, md: 10}} gap={50} maxW={700}>
    <Skeleton h={162}/>
    <Skeleton h={162}/>
    <Skeleton h={162}/>
    <Skeleton h={162}/>
    <Skeleton h={162}/>
  </Grid>
}

export default Loading;