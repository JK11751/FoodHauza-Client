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
  VStack,
} from "native-base";
import {colors} from "../../theme";
import DonationItem from "../../components/DonationItem/DonationItemDonor";
import { DonationsState } from "../../context";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api";
import { useEffect } from "react";
import { SkeletonLoader } from "../../components/GeneralLoading";
import TopDonationCard from "../../components/DonationCard";

const AllDonations = ({navigation}) => {
  const screenWidth = Dimensions.get("window").width;
  const auth = useAuth();
  const {donations, setDonations} = DonationsState();
  const [loading, setLoading] = useState(false);

  const fetchDonations = async () => {
    const token = auth.token ? auth.token : null;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URL}/donations`, config);
      if (response.data) {
        setLoading(false);

        // Success 🎉
        console.log("response", response);
        setDonations(response.data);
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
    fetchDonations();
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
              All Donations
            </Text>
            <Spacer />
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </HStack>
        </Box>
      </Box>
      <ScrollView p={"30px"}>
        <Text>Today</Text>
        <VStack h="600"  pt={5}>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <ScrollView>
              {donations?.length > 0 ? (
                <Box>
                  {donations?.map((donation) => {
                    return (
                      <TopDonationCard key={donation._id} donation={donation} navigation={navigation} />
                    );
                  })}
                </Box>
              ) : (
                <Text>No donations yet</Text>
              )}
            </ScrollView>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default AllDonations;
