import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Box, Button, ChevronLeftIcon, HStack, Text, View, Spacer, StatusBar, ThreeDotsIcon, VStack, Input, Pressable, useToast, KeyboardAvoidingView, Spinner } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "none",
    height: screenHeight,
  },
  input: {
    marginTop: 10,
    height: 50,
    width: 290,
    borderRadius: 50,
    backgroundColor: "#f3f3f3",
    margin: 12,
    padding: 10,
  },
});

const PickUpLocation = ({ navigation }) => {
  const [origin, setOrigin] = useState({
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const toastRef = useRef();

  const handleConfirmPickupPoint = () => {
    if (!origin.address) {
      toast.show({
        description: "Please enter a location",
        status: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      navigation.navigate("DonorNotificationItem", {
        selectedLocation: origin.address,
      });
      toast.show({
        description: "Pickup point confirmed successfully!",
        status: "success",
      });
    } catch (error) {
      toast.show({
        description: "Failed to confirm pickup point",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView>
        <StatusBar barStyle="light-content" />
        <VStack h="100%" w="100%">
          <View>
            <Box bg="transparent" position={"absolute"} top={2} zIndex="10">
              <Box
                alignItems="center"
                h="70px"
                w={screenWidth}
                position="relative"
                onPress={() => {
                  navigation.navigate("NewDonationPack");
                }}
              >
                <HStack paddingTop="20px" alignItems="center">
                  <Pressable
                    onPress={() => {
                      navigation.navigate("DonationPackStart");
                    }}
                  >
                    <Box ml="20px" p="10px" bg="white" rounded="md">
                      <ChevronLeftIcon color="black" />
                    </Box>
                  </Pressable>
                  <Spacer />
                  <Box mr="20px" p="10px" bg="white" rounded="md">
                    <ThreeDotsIcon color="black" />
                  </Box>
                </HStack>
              </Box>
            </Box>
            <VStack
              pt="10"
              alignItems="center"
              justifyContent="center"
              backgroundColor="white"
            >
              <Text fontWeight="bold" fontSize="20px">
                Enter pick-up Location
              </Text>
              <Box w={screenWidth} px={30} py={1}>
                <Box mb="5">
                  <Input
                    height="50"
                    width="290"
                    mt="5"
                    variant="rounded"
                    placeholder="Enter Location...."
                    value={origin.address}
                    onChangeText={(text) => setOrigin({ address: text })}
                    InputRightElement={
                      <MaterialIcons mr={5} size={24} name="location-pin" />
                    }
                  />
                </Box>
              </Box>
              <Button
                borderRadius="50px"
                h="50px"
                w="80%"
                textAlign="center"
                bg={colors.primary_color}
                position="relative"
                onPress={handleConfirmPickupPoint}
                isDisabled={loading}
              >
                {loading ? <Spinner color="white" /> : "Confirm Pickup Point"}
              </Button>
            </VStack>
          </View>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PickUpLocation;
