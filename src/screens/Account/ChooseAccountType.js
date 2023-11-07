import React, { useEffect, useRef } from "react";
import { Dimensions, ImageBackground, View, StyleSheet } from "react-native";
import { colors } from "theme";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Spacer,
  Badge,
  Pressable,
  useToast,
} from "native-base";
import { useAuth } from "../../hooks/useAuth";
import images from "../../theme/images";

// const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  img: {
    height: "100%",
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});
const ChooseAccountType = ({ route, navigation }) => {
  const [role, setRole] = React.useState("donor");
  const [error, setError] = React.useState("");
  const auth = useAuth();

  const {
    data: { name, email, password, image },
  } = route.params;
  const toast = useToast();
  const toastRef = useRef();

  const userData = {
    name: name,
    email: email,
    password: password,
    profile_pic: image,
    role: role,
  };
  // ... to save the user to state.
  const onSubmit = async () => {
    auth
      .signup(userData)
      .then((response) => {
        if (response.role === "donor") {
          navigation.navigate("DonorDashboard");
        } else if (response.role === "recepient") {
          navigation.navigate("RecepientDashboard");
        } else {
          setError("not yet authenticated");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log("upload " + err.message);
      });
  };

  useEffect(() => {
    if (error) {
      showMessage(error);
    }
  }, [error]);

  const showMessage = (errMessage) => {
    toastRef.current = toast.show({
      title: errMessage,
      placement: "top",
    });
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={images.background_img}
        resizeMode="cover"
        style={styles.img}
      >
        <Box safeArea paddingTop="10px" paddingX="30px">
          <Heading
            alignSelf="center"
            size="lg"
            paddingBottom={5}
            _dark={{
              color: "#054544",
            }}
            fontWeight="semibold"
          >
            Choose Account Type
          </Heading>
          <Box alignItems="center">
            <Pressable maxW="96" onPress={() => setRole("donor")}>
              {({ isHovered, isPressed }) => (
                <Box
                  bg={
                    isPressed
                      ? "coolGray.200"
                      : isHovered
                      ? "coolGray.200"
                      : "coolGray.100"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  p="5"
                  rounded="8"
                  shadow={3}
                  borderWidth="1"
                  borderColor="coolGray.300"
                >
                  <HStack alignItems="center">
                    <Badge
                      colorScheme="darkBlue"
                      _text={{
                        color: "white",
                      }}
                      variant="solid"
                      rounded="4"
                    >
                      Donor
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="transparent">
                      1 month ago
                    </Text>
                  </HStack>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    If you have access to eccess food or would like to help out
                    those who do are in need of food, this is the app for you
                  </Text>
                </Box>
              )}
            </Pressable>
          </Box>
          <Box alignItems="center" mt="20px">
            <Pressable maxW="96" onPress={() => setRole("recepient")}>
              {({ isHovered, isPressed }) => (
                <Box
                  bg={
                    isPressed
                      ? "coolGray.200"
                      : isHovered
                      ? "coolGray.200"
                      : "coolGray.100"
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  p="5"
                  rounded="8"
                  shadow={3}
                  borderWidth="1"
                  borderColor="coolGray.300"
                >
                  <HStack alignItems="center">
                    <Badge
                      colorScheme="darkBlue"
                      _text={{
                        color: "white",
                      }}
                      variant="solid"
                      rounded="4"
                    >
                      Recepient
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="transparent">
                      1 month ago
                    </Text>
                  </HStack>
                  <Text mt="2" fontSize="sm" color="coolGray.700">
                    If you are a person in need of food, get access to food
                    donations near you in the app
                  </Text>
                </Box>
              )}
            </Pressable>
          </Box>
          <Button
            mt={5}
            borderRadius="50px"
            h="40px"
            bg={colors.primary_color}
            position="relative"
            onPress={onSubmit}
          >
            Create Account
          </Button>
        </Box>
      </ImageBackground>
    </View>
  );
};
export default ChooseAccountType;
