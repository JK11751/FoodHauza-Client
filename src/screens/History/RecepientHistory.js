import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Box,
  ChevronLeftIcon,
  Text,
  HStack,
  Pressable,
  Spacer,
  ThreeDotsIcon,
  ScrollView,
  Button,
  Modal,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import DonationItemRecepient from "../../components/DonationItem/DonationItemRecepient";
import { BASE_API_URL } from "../../utils/api";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { RequestsState } from "../../context";
import { colors } from "../../theme";
import { SkeletonLoader } from "../../components/GeneralLoading";

const RecepientHistory = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const auth = useAuth();
  const { requests, setRequests } = RequestsState();
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      setLoading(false);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFilterDate = (event, date) => {
    setShowDatePicker(false);
    if (date && date.type !== "dismissed") {
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

  const clearHistory = () => {
    setRequests([]);
    setFilterDate(null);
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
    const requestDate = new Date(itemDate);
    const selectedDate = new Date(filterDate);
    return requestDate.toDateString() === selectedDate.toDateString();
  };

  const filteredRequests = requests?.filter((request) =>
    isDateInRange(request.createdAt)
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
        <HStack space={3} alignItems="center" mb="4">
          <Text fontSize="xl" flex={1}>
            {displayDate}
          </Text>
          <Button
            size="sm"
            backgroundColor={filterDate ? colors.gray : colors.primary_color}
            onPress={handleDateFilterToggle}
          >
            {filterDate ? "Reset Filter" : "Filter by Date"}
          </Button>
          <Button size="sm" backgroundColor={colors.gray} onPress={clearHistory}>
            Clear All
          </Button>
        </HStack>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <Box>
            {filteredRequests?.length > 0 ? (
              <Box>
                {filteredRequests.map((request) => (
                  <DonationItemRecepient key={request._id} request={request} />
                ))}
              </Box>
            ) : (
              <Text>No requests on the selected date</Text>
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

export default RecepientHistory;
