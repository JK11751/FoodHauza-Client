import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Badge, Box, Flex, HStack, Text, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from '../../theme';

const RecepientNotificationItem = ({ notification }) => {
  const {
    accepted = false,
    pickupLocation = "N/A",
    pickupDate = null,
    pickupTime = null,
  } = notification;

  const formattedDate = pickupDate ? new Date(pickupDate).toLocaleDateString() : "N/A";
  const formattedTime = pickupTime ? new Date(pickupTime).toLocaleTimeString() : "N/A";

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
              <Text bold fontSize="lg" color={accepted ? colors.success : colors.error}>
                {accepted ? "Order Accepted" : "Order Rejected"}
              </Text>
            </VStack>
            <Badge
              colorScheme={accepted ? "green" : "red"}
              variant="solid"
              borderRadius="4px"
              _text={{ color: "white" }}
            >
              {accepted ? "Accepted" : "Rejected"}
            </Badge>
          </HStack>
          <TouchableOpacity  onPress={() => navigation.navigate("reschat")}>
            <MaterialCommunityIcons
              name="chat"
              size={24}
              color={colors.primary_color}
            />
          </TouchableOpacity>
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
              {formattedDate}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="md" color="gray.800" bold>
              Pickup Time:
            </Text>
            <Text fontSize="md" color="gray.600" ml={1}>
              {formattedTime}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, 
  },
});

export default RecepientNotificationItem;
