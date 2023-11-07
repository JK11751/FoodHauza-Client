import React from 'react';
import { VStack, HStack, Avatar, Image, Text, NativeBaseProvider, AspectRatio, Center, Box, Stack, Heading } from 'native-base';

const DonationHistoryCard=()=>{
  return (
    <Box alignItems="flex-start" mt="20px" paddingLeft="5px" paddingRight="5px">
      <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <HStack p="1" space={1}>
        <Box space={2}>
          <AspectRatio w="100px">
            <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" 
          borderRadius={"15px"} 
          />
          </AspectRatio>
        </Box>
          <VStack space={1} pl={2}>
            <Heading size="md" ml="-1">
              The Garden City
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              The Silicon Valley of India.
            </Text>
          </VStack>
        </HStack>
      </Box>
  </Box>
  );
          }
export default DonationHistoryCard
