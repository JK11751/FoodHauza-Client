import {Dimensions, StyleSheet, View} from "react-native";
import React from "react";
import {
  Box,
  ChevronLeftIcon,
  Text,
  HStack,
  Pressable,
  Spacer,
  ThreeDotsIcon,
  ScrollView,
} from "native-base";
import {colors} from "../../theme";
import  DonationItemRecepient  from "../../components/DonationItem/DonationItemRecepient";
import { BASE_API_URL } from "../../utils/api";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { RequestsState } from "../../context";
import { SkeletonLoader } from "../../components/GeneralLoading";

const RecepientHistory = ({navigation}) => {
  const screenWidth = Dimensions.get("window").width;
  const auth = useAuth();
  const {requests, setRequests} = RequestsState();
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
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
        `${BASE_API_URL}/requests?user_id=${auth.user._id}`,
        config
      );
      if (response.data) {
        setLoading(false);

        // Success 🎉
        console.log("response", response);
        setRequests(response.data);
      }
    } catch (error) {
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
    fetchRequests();
  }, []);
  return (
    <View>
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
            navigation.navigate("RecepientDashboard");
          }}
        >
          <HStack paddingTop="20px" alignItems="center">
            <Pressable
              onPress={() => {
                navigation.navigate("RecepientDashboard");
              }}
            >
              <ChevronLeftIcon paddingLeft="50px" color="white" />
            </Pressable>
            <Spacer />
            <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
              My Request History
            </Text>
            <Spacer />
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </HStack>
        </Box>
      </Box>
      <ScrollView p={"30px"}>
        <Text>Today</Text>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <Box>
            {requests?.length > 0 ? (
              <Box>
              {requests?.map((request) => (
                <DonationItemRecepient key={request._id} request={request} />
              ))}
            </Box>
            ) : (
              <Text>No donations requests yet</Text>
            )}
          </Box>
        )}
      </ScrollView>
    </View>
  );
};

export default RecepientHistory;
