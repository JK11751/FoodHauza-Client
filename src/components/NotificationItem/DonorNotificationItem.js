import { StyleSheet, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Badge, Box, Flex, HStack, Text, VStack, Modal, Button, FormControl, Input} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api";
import images from "../../theme/images";

const DonorNotificationItem = ({ request, onUpdate }) => {
  const { requested_date, delivered_date, requestor, accepted } = request;
  const [modalVisible, setModalVisible] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const handleAccept = async () => {
    try {
      await axios.put(`${BASE_API_URL}/requests/accept/${request._id}`, {
        pickupDate,
        pickupTime,
        pickupLocation,
      });
      onUpdate();
    } catch (error) {
      console.error("Failed to accept the request", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`${BASE_API_URL}/requests/reject/${request._id}`);
      onUpdate();
    } catch (error) {
      console.error("Failed to reject the request", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_API_URL}/requests/${request._id}`);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete the request", error);
    } finally {
      setModalVisible(false);
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
            </HStack>
            <Badge
              ml="auto"
              size="md"
              h="30px"
              borderRadius="5px"
              colorScheme={"green"}
            >
              Pending
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
        <Modal.Content maxWidth="400px" >
          <ImageBackground style={styles.img} source={images.background_img}>
          <Modal.CloseButton colorScheme={colors.primary_color} bgColor={'white'} />
          <Modal.Header bgColor={colors.primary_color}  borderBottomRadius={25}>Manage Request</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Pickup Date</FormControl.Label>
              <Input
              bgColor={"white"}
                placeholder="YYYY-MM-DD"
                value={pickupDate}
                onChangeText={setPickupDate}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormControl.Label>Pickup Time</FormControl.Label>
              <Input
              bgColor={"white"}
                placeholder="HH:MM"
                value={pickupTime}
                onChangeText={setPickupTime}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormControl.Label>Pickup Location</FormControl.Label>
              <Input
              bgColor={"white"}
                placeholder="Enter location"
                value={pickupLocation}
                onChangeText={setPickupLocation}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="blue"
                onPress={handleAccept}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                onPress={handleReject}
              >
                Reject
              </Button>
              <Button
                colorScheme="gray"
                onPress={handleDelete}
              >
                Delete
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
