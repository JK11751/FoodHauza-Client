import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Badge, Box, Flex, HStack, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";

const RecepientNotificationItem = ({ notification }) => {
  const navigation = useNavigation();
  const {
    status,
    donation = [],
    pickupLocation = "N/A",
    pickupDate = null,
    pickupTime = null,
  } = notification;

  const donationId = donation[0]?._id;

  const formatPickupDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  const formatPickupTime = (time) => {
    return time ? new Date(time).toLocaleTimeString() : "N/A";
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Accepted":
        return "Order Accepted";
      case "Rejected":
        return "Order Rejected";
      default:
        return "Order Pending";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return colors.success;
      case "Rejected":
        return colors.error;
      default:
        return colors.primary_color; 
    }
  };

  return (
    <View style={styles.container}>
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
            <VStack>
              <Text
                bold
                fontSize="lg"
                color={getStatusColor(status)}
              >
                {getStatusText(status)}
              </Text>
            </VStack>
            <TouchableOpacity
              onPress={() => navigation.navigate("reschat", { donationId })} 
            >
              <MaterialCommunityIcons
                name="chat"
                size={24}
                color={colors.primary_color}
              />
            </TouchableOpacity>
            <Badge
              colorScheme={status === "Accepted" ? "green" : status === "Rejected" ? "red" : "blue"}
              variant="solid"
              borderRadius="4px"
              _text={{ color: "white" }}
            >
              {status}
            </Badge>
          </HStack>
        </HStack>
        <VStack space={1} mt={2}>
          <HStack>
            <Text fontSize="md" color="gray.800" bold>
              Pickup Location:
            </Text>
            <Text fontSize="md" color="gray.600" ml={1}>
              {pickupLocation}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="md" color="gray.800" bold>
              Pickup Date:
            </Text>
            <Text fontSize="md" color="gray.600" ml={1}>
              {formatPickupDate(pickupDate)}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="md" color="gray.800" bold>
              Pickup Time:
            </Text>
            <Text fontSize="md" color="gray.600" ml={1}>
              {formatPickupTime(pickupTime)}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default RecepientNotificationItem;
