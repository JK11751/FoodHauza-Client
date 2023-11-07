import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {AspectRatio, Badge, Box, Flex, HStack, Text, ThreeDotsIcon, VStack, Image} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../theme";

const DonationItem = ({navigation, donation, route}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(route, {donation_id: donation._id})}
      >
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
                    {donation?.foods?.map((f) => {
                      return (
                        <Text>
                          {f.food.slice(-1).map((fd) => {
                            return <Text>{fd}</Text>;
                          })}
                        </Text>
                      );
                    })}
                  </Text>
                  <Text
                    w="59px"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="10px"
                  >
                    {donation?.foods?.slice(-1).map((f) => {
                      return (
                        <HStack>
                          <Text>{f.amount}</Text>
                          <Text> {f.unit}</Text>
                        </HStack>
                      );
                    })}
                    Hello
                  </Text>
                </VStack>
              </Box>
              <ThreeDotsIcon paddingTop="80px" color="black" />
            </HStack>
          </Box>
      </TouchableOpacity>
    </View>
  );
};
export const DonationItemRecepient = ({navigation, donation, route}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(route, {donation_id: donation._id})}
      >
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
                    {donation?.donation?.map(
                      (don)=>don?.foods?.slice(-1).map((f) => {
                      return (
                        <Text isTruncated>
                          {f.food.map((fd) => {
                            return <Text>{fd}, </Text>;
                          })}
                        </Text>
                      );
                    }))}
                  </Text>
                  <Text
                    w="59px"
                    fontStyle="normal"
                    fontWeight="700"
                    fontSize="10px"
                  >
                    {donation?.donation?.map(
                      (don)=>don?.foods?.slice(-1).map((f) => {
                      return (
                        <HStack>
                          <Text>
                            {f.amount}
                          </Text>
                          <Text> {f.unit}</Text>
                        </HStack>
                      )
                    }))}
                  </Text>
                </VStack>
              </Box>
              <ThreeDotsIcon paddingTop="80px" color="black" />
            </HStack>
          </Box>
      </TouchableOpacity>
    </View>
  );
};

export default DonationItem;

const styles = StyleSheet.create({});
