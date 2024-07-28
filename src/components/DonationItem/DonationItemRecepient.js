import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  AspectRatio,
  Box,
  HStack,
  Text,
  Badge,
  VStack,
  Image,
  ThreeDotsIcon,
  CloseIcon,
} from "native-base";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { colors } from "../../theme";

const DonationItemRecepient = ({ request }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const fetchRequestDetails = async () => {
    setLoading(true);
    const token = auth.token ? auth.token : null;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${BASE_API_URL}/requests/${request._id}`,
        config
      );
      setDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching request details:", error);
      setLoading(false);
    }
  };

  const handlePress = () => {
    if (!details) {
      fetchRequestDetails();
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Box
          w="full"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <HStack>
            <Box h="100%">
              <AspectRatio w="55%" ratio={9 / 9}>
                <Image
                  source={{
                    uri:
                      request.donation[0]?.foods[0]?.images[0] ||
                      "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                  }}
                  alt="donation image"
                />
              </AspectRatio>
            </Box>
            <Box alignItems="flex-start" marginLeft="-65px" paddingTop="20px">
              <VStack ml="5px">
                <Text
                  w="160px"
                  fontStyle="normal"
                  fontWeight="400"
                  fontSize="20px"
                  color="#000000"
                >
                  {request.donation[0]?.foods[0]?.food.join(", ")}
                </Text>
                <Text
                  w="59px"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="10px"
                >
                  {request.donation[0]?.foods[0]?.amount}{" "}
                  {request.donation[0]?.foods[0]?.unit}
                </Text>
                <Text fontStyle="normal" fontWeight="700" fontSize="10px">
                  {" "}
                  {request.donation[0]?.foods[0]?.description}
                </Text>
              </VStack>
            </Box>
            <ThreeDotsIcon paddingTop="80px" color="black" />
          </HStack>
        </Box>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <CloseIcon color="white" />
            </TouchableOpacity>
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary_color} />
            ) : (
              details && (
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Donation Details</Text>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Location:
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontWeight="400"
                    >
                      {details.donation[0]?.location.join(", ")}
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Category:
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontWeight="400"
                    >
                      {details.donation[0]?.foods[0]?.category}
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Description:
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontWeight="400"
                    >
                      {details.donation[0]?.foods[0]?.description}
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Requested Date:
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontWeight="400"
                    >
                      {new Date(details.requested_date).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    marginTop={5}
                    marginBottom={5}
                  >
                    Status
                  </Text>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Accepted:
                    </Text>
                    <Badge
                    borderRadius={15}
                      colorScheme={details.accepted ? "green" : "red"}
                      variant="solid"
                    >
                      {details.accepted ? "Yes" : "No"}
                    </Badge>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Delivered:
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontWeight="400"
                    >
                      {details.delivered ? "Yes" : "No"}
                    </Text>
                  </HStack>
                  <HStack space={2} alignItems="center">
                    <Text color="black" fontWeight="400">
                      Cancelled:
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontWeight="400"
                    >
                      {details.cancelled ? "Yes" : "No"}
                    </Text>
                  </HStack>
                </View>
              )
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DonationItemRecepient;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    width: "100%",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_color,
    borderRadius: 20,
  },
});
