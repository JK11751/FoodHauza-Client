import React, { useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
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
  Button,
  Modal,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../theme";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api";
import { DonationsState } from "../../context";
import { useAuth } from "../../hooks/useAuth";
import { SkeletonLoader } from "../../components/GeneralLoading";
import DonationItemDonor from "../../components/DonationItem/DonationItemDonor";

const DonorHistory = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const auth = useAuth();
  const { donations, setDonations } = DonationsState();
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
        `${BASE_API_URL}/donations/user/${auth.user._id}`,
        config
      );
      if (response.data) {
        setLoading(false);
        setDonations(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleFilterDate = (event, date) => {
    setShowDatePicker(false);

    if (event.type === "set" && date) {
      // Only update the filterDate if a date was selected
      setFilterDate(date);
    }
  };

  const handleDateFilterToggle = () => {
    if (filterDate) {
      setFilterDate(null);
    } else {
      setShowDatePicker(true);
    }
  };

  const clearFilter = () => {
    setFilterDate(null);
  };

  const clearAllDonations = () => {
    setDonations([]);
    clearFilter();
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const displayDate = filterDate
    ? formatDate(new Date(filterDate))
    : `Today (${formatDate(new Date())})`;

  const isDateInRange = (itemDate) => {
    if (!filterDate) return true; // No filter applied
    const donationDate = new Date(itemDate);
    const selectedDate = new Date(filterDate);
    return donationDate.toDateString() === selectedDate.toDateString();
  };

  const filteredDonations = donations?.filter((donation) =>
    isDateInRange(donation.createdAt)
  );

  return (
    <View style={{ flex: 1 }}>
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
                navigation.navigate("DonorDashboard");
              }}
            >
              <ChevronLeftIcon paddingLeft="50px" color="white" />
            </Pressable>
            <Spacer />
            <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
              My Donation History
            </Text>
            <Spacer />
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </HStack>
        </Box>
      </Box>
      <ScrollView p={"30px"}>
        <HStack space={3} alignItems="center" mb="4">
          <Text fontSize="xl" flex={1}>
            {displayDate}
          </Text>
          <Button
            size="sm"
            backgroundColor={filterDate ? colors.gray : colors.primary_color}
            onPress={handleDateFilterToggle}
          >
            {filterDate ? "Reset" : "Filter by Date"}
          </Button>
          <Button
            size="sm"
            backgroundColor={colors.danger_color}
            onPress={clearAllDonations}
          >
            Clear All
          </Button>
        </HStack>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <Box>
            {filteredDonations?.length > 0 ? (
              <Stack space={3}>
                {filteredDonations.map((donation) => (
                  <DonationItemDonor
                    navigation={navigation}
                    key={donation._id}
                    donation={donation}
                    route={"DonorDonationDetails"}
                  />
                ))}
              </Stack>
            ) : (
              <Text>No donations yet</Text>
            )}
          </Box>
        )}
      </ScrollView>
      {showDatePicker && (
        <Modal isOpen={showDatePicker} onClose={() => setShowDatePicker(false)}>
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display="default"
            onChange={handleFilterDate}
          />
        </Modal>
      )}
    </View>
  );
};

export default DonorHistory;
