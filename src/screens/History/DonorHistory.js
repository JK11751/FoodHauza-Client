import React, {useState, useEffect} from "react";
import {Dimensions, View} from "react-native";
import {
  Box,
  ChevronLeftIcon,
  Text,
  HStack,
  Pressable,
  Spacer,
  ThreeDotsIcon,
  ScrollView,
  Stack,
} from "native-base";
import {colors} from "../../theme";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api";
import { DonationsState } from "../../context";
import { useAuth } from "../../hooks/useAuth";
import { SkeletonLoader } from "../../components/GeneralLoading";
import DonationItem from "../../components/DonationItem";

const DonorHistory = ({navigation}) => {
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
      const response = await axios.get(
        `${BASE_API_URL}/donations?user_id=${auth.user._id}`,
        config
      );
      if (response.data) {
        setLoading(false);

        // Success 🎉
        console.log("response", response.data);
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
              History
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
            {donations?.length > 0 ? (
              <Stack space={3}>
                {donations?.map((donation) => {
                  return (
                    <DonationItem
                      navigation={navigation}
                      key={donation._id}
                      donation={donation}
                      route={"DonorDonationDetails"}
                    />
                  );
                })}
              </Stack>
            ) : (
              <Text>No donations yet</Text>
            )}
          </Box>
        )}
      </ScrollView>
    </View>
  );
};

export default DonorHistory;

