import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  ChevronLeftIcon,
  Text,
  HStack,
  Pressable,
  Spacer,
  ThreeDotsIcon,
  IconButton,
  Badge,
  Button,
} from "native-base";
import { colors } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";
import DonorNotificationItem from "../../components/NotificationItem/DonorNotificationItem";
import { BASE_API_URL } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const DonorNotifications = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPending, setShowPending] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const donorId = user?._id;

  useEffect(() => {
    if (donorId) {
      fetchRequests();
    }
  }, [donorId, selectedDate]);

  const fetchRequests = async () => {
    try {
      const queryParams = selectedDate
        ? `?date=${selectedDate.toISOString().split("T")[0]}`
        : "";
      const response = await axios.get(
        `${BASE_API_URL}/donations/requests/${donorId}${queryParams}`
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleClearFilter = () => {
    setSelectedDate(null);
  };

  const handleUpdate = (updatedRequest) => {
    console.log("Updated Request:", updatedRequest); // Debugging log
    if (updatedRequest && updatedRequest._id) {
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    } else {
      console.error("Invalid updatedRequest object:", updatedRequest);
    }
  };

  const filteredRequests = selectedDate
    ? requests.filter((request) => {
        const requestDate = new Date(request.requested_date).toDateString();
        const selectedDateString = selectedDate.toDateString();
        return requestDate === selectedDateString;
      })
    : requests;

  const pendingRequests = filteredRequests.filter(
    (request) => request.status === "Pending"
  );
  const pendingRequestsCount = pendingRequests.length;

  return (
    <View style={styles.container}>
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
          <HStack paddingTop="10px" alignItems="center">
            <Pressable
              onPress={() => {
                navigation.navigate("DonorDashboard");
              }}
            >
              <ChevronLeftIcon paddingLeft="50px" color="white" />
            </Pressable>
            <Spacer />
            <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
              Notifications
            </Text>
            <Spacer />
            <Box position="relative">
              <IconButton
                icon={
                  <MaterialIcons name="notifications" size={20} color="white" />
                }
                onPress={() => setShowPending(!showPending)}
              />
              {pendingRequestsCount > 0 && (
                <Badge
                  colorScheme="danger"
                  rounded="full"
                  mb={-4}
                  mr={-2}
                  zIndex={1}
                  variant="solid"
                  alignSelf="center"
                >
                  {pendingRequestsCount}
                </Badge>
              )}
            </Box>
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </HStack>
        </Box>
      </Box>
      <View style={styles.filterContainer}>
        <Button
          bgColor={colors.primary_color}
          onPress={() => setShowDatePicker(true)}
        >
          {selectedDate ? selectedDate.toDateString() : "Filter By Date"}
        </Button>
        {selectedDate && (
          <Button bgColor={colors.primary_color} onPress={handleClearFilter}>
            Clear Filter
          </Button>
        )}
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={selectedDate || new Date()}
            onChange={handleDateChange}
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {showPending ? (
          <>
            <Text>Pending Requests</Text>
            {pendingRequestsCount > 0 ? (
              pendingRequests.map((request) => (
                <DonorNotificationItem
                  key={request._id}
                  request={request}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <Text fontSize="sm" alignSelf={"center"}>
                No pending requests
              </Text>
            )}
          </>
        ) : (
          <>
            <Text>Requests</Text>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <DonorNotificationItem
                  key={request._id}
                  request={request}
                  onUpdate={handleUpdate} // Pass handleUpdate as onUpdate prop
                />
              ))
            ) : (
              <Text>No requests found</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DonorNotifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    padding: 16,
    paddingBottom: 30,
  },
  filterContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
