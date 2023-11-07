import React from 'react'
import {
  Box,
  AspectRatio,
  Image,
  Text,
  ThreeDotsIcon,
  HStack,
  VStack,
} from 'native-base'

const DonationCard = ({donation}) => (
  <Box alignItems="flex-start" mt="20px" paddingLeft="5px" paddingRight="5px">
    <Box
      w="full"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <HStack>
        <Box h="100%">
          <AspectRatio w="55%" ratio={9 / 9}>
            <Image
              source={{
                uri: donation.image
                  ? donation.image
                  : "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="my image"
            />
          </AspectRatio>
        </Box>
        <Box alignItems="flex-start" marginLeft="-65px" paddingTop="20px">
          <VStack ml="5px">
            <Text
              w="160px"
              fontStyle="normal"
              fontWeight="400"
              fontSize="20px"
              color="#000000"
            >
              {donation.food.map((f) => {
                return <Text>{f}</Text>;
              })}
            </Text>
            <Text w="59px" fontStyle="normal" fontWeight="700" fontSize="10px">
              {donation.amount}
              <Text> {donation.unit}</Text>
            </Text>
          </VStack>
        </Box>
        <ThreeDotsIcon paddingTop="80px" color="black" />
      </HStack>
    </Box>
  </Box>
);
export default DonationCard
