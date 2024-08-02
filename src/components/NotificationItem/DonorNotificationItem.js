import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Modal,
  Button,
  FormControl,
  Input,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api";
import images from "../../theme/images";

const DonorNotificationItem = ({ request, onUpdate }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedLocation } = route.params || {};
  const { requested_date, requestor } = request;
  const [modalVisible, setModalVisible] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState("");
  const [status, setStatus] = useState(request.status);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  {
    /*
  useEffect(() => {
    if (selectedLocation) {
      setPickupLocation(selectedLocation);
    }
  }, [selectedLocation]);
*/
  }
  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${BASE_API_URL}/requests/accept/${request._id}`,
        {
          pickupDate,
          pickupTime,
          pickupLocation,
        }
      );

      if (response.data) {
        setStatus("Accepted");
        onUpdate(response.data);
      } else {
        console.error("No updated request data received.");
      }
    } catch (error) {
      console.error("Failed to accept the request", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`${BASE_API_URL}/requests/reject/${request._id}`);
      setStatus("Rejected");
      onUpdate();
    } catch (error) {
      console.error("Failed to reject the request", error);
    } finally {
      setModalVisible(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPickupDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setPickupTime(selectedTime);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Box bg="white" shadow={2} mt={3} p={4} borderRadius="10px">
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" space={3}>
              <Flex
                h="40px"
                w="40px"
                borderRadius="20px"
                alignItems="center"
                justifyContent="center"
                bg={colors.secondary_color}
              >
                <MaterialCommunityIcons
                  name="motorbike"
                  size={24}
                  color={colors.primary_color}
                />
              </Flex>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("donorchat", {
                    receiverId: requestor[0]._id,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="chat"
                  size={24}
                  color={colors.primary_color}
                />
              </TouchableOpacity>
            </HStack>
            <Badge
              ml="auto"
              size="md"
              h="30px"
              borderRadius="5px"
              colorScheme={
                status === "Accepted"
                  ? "green"
                  : status === "Rejected"
                  ? "red"
                  : "blue"
              }
            >
              {status === "Accepted"
                ? "Accepted"
                : status === "Rejected"
                ? "Rejected"
                : "Pending"}
            </Badge>
          </HStack>
          <VStack mt={2} space={2}>
            <HStack>
              <Text fontSize="md" bold>
                Requestor:
              </Text>
              <Text fontSize="md" color="gray.700" ml={2}>
                {requestor[0].name}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="md" bold>
                Email:
              </Text>
              <Text fontSize="md" color="gray.700" ml={2}>
                {requestor[0].email}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="md" bold>
                Requested Date:
              </Text>
              <Text fontSize="md" color="gray.700" ml={2}>
                {new Date(requested_date).toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Text fontSize="md" bold>
                Time Requested:
              </Text>
              <Text fontSize="md" color="gray.700" ml={2}>
                {new Date(requested_date).toLocaleTimeString()}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </TouchableOpacity>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <ImageBackground style={styles.img} source={images.background_img}>
            <Modal.CloseButton bgColor={"white"} />

            <Modal.Body>
              <FormControl
                isDisabled={status === "Accepted" || status === "Rejected"}
              >
                <FormControl.Label fontSize={20}>
                  Pickup Date :
                </FormControl.Label>
                <Button
                  onPress={() => setShowDatePicker(true)}
                  disabled={status === "Accepted" || status === "Rejected"}
                >
                  {pickupDate ? pickupDate.toLocaleDateString() : "Select Date"}
                </Button>
                {showDatePicker && (
                  <DateTimePicker
                    value={pickupDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}
              </FormControl>
              <FormControl
                mt={2}
                isDisabled={status === "Accepted" || status === "Rejected"}
              >
                <FormControl.Label fontSize={20}>
                  Pickup Time :
                </FormControl.Label>
                <Button
                  onPress={() => setShowTimePicker(true)}
                  disabled={status === "Accepted" || status === "Rejected"}
                >
                  {pickupTime ? pickupTime.toLocaleTimeString() : "Select Time"}
                </Button>
                {showTimePicker && (
                  <DateTimePicker
                    value={pickupTime}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                  />
                )}
              </FormControl>
              <FormControl
                mt={2}
                isDisabled={status === "Accepted" || status === "Rejected"}
              >
                <FormControl.Label fontSize={20}>
                  Pickup Location :
                </FormControl.Label>
                <Input
                  placeholder="Enter location"
                  value={pickupLocation}
                  bgColor={"white"}
                  onChangeText={setPickupLocation}
                  isDisabled={status === "Accepted" || status === "Rejected"}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer bgColor={colors.secondary_color}>
              <Button.Group justifyContent={"center"} width={"full"} space={2}>
                <Button
                  width={90}
                  ml={4}
                  colorScheme="green"
                  onPress={handleAccept}
                  isDisabled={
                    status !== "Pending" ||
                    !pickupDate ||
                    !pickupTime ||
                    !pickupLocation
                  }
                >
                  Accept
                </Button>
                <Button
                  width={90}
                  colorScheme="gray"
                  onPress={handleReject}
                  isDisabled={status !== "Pending"}
                >
                  Reject
                </Button>
              </Button.Group>
            </Modal.Footer>
          </ImageBackground>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default DonorNotificationItem;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
