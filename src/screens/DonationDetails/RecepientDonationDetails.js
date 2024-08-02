import { Dimensions, StyleSheet } from "react-native";
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
  Button,
  ChevronLeftIcon,
  Pressable,
  View,
  VStack,
  useToast,
} from "native-base";
import { colors } from "../../theme";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SkeletonLoader } from "../../components/GeneralLoading";
import { BASE_API_URL } from "../../utils/api";
import RequestReceived from "../../components/RecepientRequest/RecepientRequest";

const DonationDetails = ({ route, navigation }) => {
  const [show, setShow] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const auth = useAuth();
  const [hasRequested, setHasRequested] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { donation_id } = route.params;
  const toast = useToast();
  const toastRef = useRef();
  const [error, setError] = useState("");
  const today = new Date();
  const requestor_id = auth.user._id;

  const fetchRequestDetails = async () => {
    const token = auth.token ? auth.token : null;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${BASE_API_URL}/donations/${donation_id}`,
        config
      );
      if (response.data) {
        setRequestDetails(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRequestStatus = async () => {
    const token = auth.token ? auth.token : null;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${BASE_API_URL}/requests/check?donation_id=${donation_id}&requestor_id=${auth.user._id}`,
        config
      );
      setHasRequested(response.data.hasRequested);
    } catch (error) {
      handleError(error);
    }
  };

  const createDonationRequest = async () => {
    const token = auth.token ? auth.token : null;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/requests`,
        {
          donation: [donation_id],
          requestor: [requestor_id],
          status: "Pending",
          requested_date: today.toISOString(),
        },
        config
      );
      if (response.data && response.status === 201) {
        setShow(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (
          error.response.data.message ===
          "This donation has already been requested"
        ) {
          toast.show({
            render: () => (
              <Box
                bg="red.500"
                _text={{ color: "white" }}
                px="2"
                py="1"
                rounded="sm"
              >
                This donation has already been requested
              </Box>
            ),
            placement: "bottom",
          });
        } else {
          toast.show({
            title: "An error occurred. Please try again.",
            status: "danger",
            placement: "top",
          });
        }
      } else {
        toast.show({
          title: "An error occurred. Please try again.",
          status: "danger",
          placement: "top",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    setError(error.message);
  };

  useEffect(() => {
    fetchRequestDetails();
    checkUserRequestStatus();
  }, [donation_id]);

  useEffect(() => {
    if (error) {
      showMessage(error);
    }
  }, [error]);

  const showMessage = (errMessage) => {
    toastRef.current = toast.show({
      title: errMessage,
      placement: "top",
    });
  };
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
        >
          <HStack paddingTop="20px" alignItems="center">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ChevronLeftIcon paddingLeft="50px" color="white" />
            </Pressable>
            <Spacer />
            <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
              Donation Details
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
                        uri:
                          requestDetails.foods[0]?.images[0] ||
                          "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
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
                      Donation Details
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
                      {requestDetails.foods.length} donation(s) available
                    </Text>
                    <Stack bg="gray.50" space={4}>
                      {requestDetails.foods.map((f) => (
                        <Stack space={4} key={f._id}>
                          <Box
                            flexDir="row"
                            h="150px"
                            pl={2}
                            borderRadius="5px"
                            bg="gray.50"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <VStack py={2}>
                              <Text>
                                {f.food.map((fo, index) => (
                                  <Text key={index}>
                                    {fo}
                                    {index !== f.food.length - 1 && ", "}
                                  </Text>
                                ))}
                              </Text>
                              <Text fontWeight="400" color="black">
                                {f.description}
                              </Text>
                              <HStack space={2} alignItems="center">
                                <Text r>Amount:</Text>
                                <Text fontWeight="400" color="black">
                                  {f.amount}
                                </Text>
                              </HStack>
                              <HStack space={2} alignItems="center">
                                <Text fontWeight="500" color="black">
                                  Unit:
                                </Text>
                                <Text fontWeight="400" color="black">
                                  {f.unit}
                                </Text>
                              </HStack>
                            </VStack>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  <VStack space={4} alignItems="flex-start" mt={2}>
                    <HStack space={2} alignItems="center">
                      <Text color="black" fontWeight="400">
                        Created At:
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{ color: "warmGray.200" }}
                        fontWeight="400"
                      >
                        {new Date(requestDetails.createdAt).toLocaleString()}
                      </Text>
                    </HStack>

                    <HStack space={2} alignItems="center">
                      <Text color="black" fontWeight="400">
                        Location:
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{ color: "warmGray.200" }}
                        fontWeight="400"
                      >
                        {requestDetails.location}
                        {/* {requestDetails.location.join(", ")}*/}
                      </Text>
                    </HStack>
                  </VStack>

                  <Button
                    mt={5}
                    borderRadius="50px"
                    h="40px"
                    bg={colors.primary_color}
                    position="relative"
                    onPress={createDonationRequest}
                    isDisabled={hasRequested}
                  >
                    {hasRequested ? "Already Requested" : "Request Donation"}
                  </Button>
                </Stack>
              </Box>
            </Box>
          ) : (
            <Text>No donation details yet</Text>
          )}
        </Box>
      )}
      <RequestReceived show={show} setShow={setShow} navigation={navigation} />
    </View>
  );
};

export default DonationDetails;
