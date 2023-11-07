import {Dimensions, StyleSheet} from "react-native";
import React from "react";
import {
  AspectRatio,
  Text,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  ThreeDotsIcon,
  Spacer,
  ChevronLeftIcon,
  Pressable,
  View,
  Flex,
  VStack,
} from "native-base";
import {colors} from "../../theme";
import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {SkeletonLoader} from "../../components/GeneralLoading";
import {BASE_API_URL} from "../../utils/api";

const DonorDonationDetails = ({route, navigation}) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const auth = useAuth();
  const [requestDetails, setRequestDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const {donation_id} = route.params;

  const fetchRequestDetails = async () => {
    const token = auth.token ? auth.token : null;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_API_URL}/donations/${donation_id}`,
        config
      );
      if (response.data) {
        setLoading(false);

        // Success 🎉
        console.log("response", response);
        setRequestDetails(response.data);
      }
    } catch (error) {
        setLoading(false)
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log("Error", error.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, []);

  return (
    <View background={"white"} h={screenHeight}>
      <Box backgroundColor="#FFFFFF">
        <Box
          alignItems="center"
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          h="70px"
          w={screenWidth}
          bg={colors.primary_color}
          position="relative"
          onPress={() => {
            navigation.navigate("DonorDashboard");
          }}
        >
          <HStack paddingTop="20px" alignItems="center">
            <Pressable
              onPress={() => {
                navigation.navigate("DonorDashboard");
              }}
            >
              <ChevronLeftIcon paddingLeft="50px" color="white" />
            </Pressable>
            <Spacer />
            <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
              Donor Details
            </Text>
            <Spacer />
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </HStack>
        </Box>
      </Box>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Box>
          {requestDetails._id ? (
            <Box alignItems="center" px={30} mt={5}>
              <Box
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: "white",
                }}
              >
                <Box>
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Image
                      borderRadius={"5px"}
                      source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                  <Center
                    bg={colors.primary_color}
                    _dark={{
                      bg: "violet.400",
                    }}
                    _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "xs",
                    }}
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5"
                    borderBottomLeftRadius={"5px"}
                  >
                    PHOTOS
                  </Center>
                </Box>
                <Stack p="4" space={3} mt="5">
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      Donation Pack
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: "violet.500",
                      }}
                      _dark={{
                        color: "violet.400",
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1"
                    >
                      {requestDetails?.donation?.length} donation
                    </Text>
                    <Stack space={4}>
                      {requestDetails.donation.map((don) => {
                        return (
                          <Stack space={4}>
                            {don?.foods?.map((f) => {
                              return (
                                <Box
                                  flexDir={"row"}
                                  bg="gray.50"
                                  h="70px"
                                  p={2}
                                  borderRadius={"5px"}
                                >
                                  <VStack py={2}>
                                    <Text>
                                      {f.food.map((fo) => {
                                        return <Text>{fo}, </Text>;
                                      })}
                                    </Text>
                                    <Text fontWeight="400" color="black">
                                      {f.description}
                                    </Text>
                                  </VStack>
                                </Box>
                              );
                            })}
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>

                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                        fontWeight="400"
                      >
                        6 mins ago
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          ) : (
            <Text>No donation details yet</Text>
          )}
        </Box>
      )}
    </View>
  );
};

export default DonorDonationDetails;
