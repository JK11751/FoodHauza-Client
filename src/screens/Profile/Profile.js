import React, {useRef} from "react";
import {
  Dimensions,
  StyleSheet,
  Switch,
} from "react-native";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { colors } from "theme";
import {
  Box,
  Heading,
  Input,
  Spacer,
  Avatar,
  VStack,
  Text,
  FormControl,
  HStack,
  ScrollView,
  ChevronLeftIcon,
  Icon,
  Button,
  Image,
  Pressable,
  ThreeDotsIcon,
  Circle,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../theme";
import { useAuth } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  img: {
    height: "100%",
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});
const Profile = ({ navigation }) => {
  const auth = useAuth()
  const toastRef = useRef()
  const toast = useToast()
  return (
    <ScrollView>
      <SafeAreaView style={styles.root}>
        <Image
          h={190}
          source={images.background_img}
          resizeMode="cover"
          alt="img"
          position={"absolute"}
          top={0}
        />
        <Box bg="transparent" position={"absolute"} top={2} zIndex="10">
          <Box
            alignItems="center"
            h="70px"
            w={screenWidth}
            position="relative"
            onPress={() => {
              navigation.navigate("Notifications");
            }}
          >
            <HStack paddingTop="20px" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.navigate("Notifications");
                }}
              >
                <Box ml="20px" p="10px" bg="white" rounded="md">
                  <ChevronLeftIcon color="black" />
                </Box>
              </Pressable>
              <Spacer />
              <Heading>Profile</Heading>
              <Spacer />
              <Box mr="20px" p="10px" bg="white" rounded="md">
                <ThreeDotsIcon color="black" />
              </Box>
            </HStack>
          </Box>
        </Box>
        <Box style={styles.img}>
          <Box safeArea paddingX="40px" mt="20">
            <VStack alignItems="center" paddingBottom={2}>
              <Circle
                borderRadius={100}
                p={4}
                borderStyle="dashed"
                borderColor="gray.500"
                borderWidth="1px"
              >
                <Avatar
                  alignSelf="center"
                  w="135px"
                  h="135px"
                  bg="green.500"
                  size="2xl"
                  // mt="10px"
                  source={{
                    uri: "https://bit.ly/sage-adebayo",
                  }}
                />
              </Circle>
              <Box
                py={1}
                mt={-2}
                px={2}
                borderRadius={10}
                backgroundColor={colors.background_color}
              >
                <Ionicons
                  border="2px"
                  color="#5AAE7F"
                  name="md-camera"
                  size={24}
                />
              </Box>
            </VStack>
          </Box>
          <Box>
            <VStack paddingBottom={5} alignItems="center">
              <Heading
                // width="183px"
                height="23px"
                fontStyle="normal"
                fontWeight="700"
                font-size="20px"
                lineHeight="23px"
              >
                {auth.user.name}
              </Heading>
              <Text
                // width="159px"
                height="20px"
                fontStyle="normal"
                fontWeight="500"
                fontSize="13px"
                lineHeight="20px"
                color="#979494"
              >
                {auth.user.email}
              </Text>
            </VStack>
            <Heading
              px={30}
              // width="179px"
              height="23px"
              fontStyle="normal"
              fontWeight="700"
              fontSize="20px"
              lineHeight="23px"
              color="#2C2C2C"
            >
              Profile Information
            </Heading>
            <Box w={screenWidth} px={30}>
              <FormControl paddingTop={5} pb={3}>
                <FormControl.Label>Full Name</FormControl.Label>
                <Input
                  w={{
                    base: "100%",
                    md: "25%",
                  }}
                  borderRadius={"40px"}
                  type="email"
                  bg="#F4F4F4"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color={colors.primary_color}
                    />
                  }
                  placeholder="Catherine Ndereba"
                  value={auth.user.name}
                  InputRightElement={
                    <Icon
                      as={<AntDesign name="edit" />}
                      size={5}
                      mr="2"
                      color="#000000"
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label color="#000000">
                  Email address
                </FormControl.Label>
                <Input
                  w={{
                    base: "100%",
                    md: "25%",
                  }}
                  bg="#F4F4F4"
                  borderRadius={"40px"}
                  type="password"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="email" />}
                      size={5}
                      ml="2"
                      color={colors.primary_color}
                    />
                  }
                  placeholder="catherine@gmail.com"
                  value={auth.user.email}
                  InputRightElement={
                    <Icon
                      as={<AntDesign name="edit" />}
                      size={5}
                      mr="2"
                      color="#000000"
                    />
                  }
                />
              </FormControl>
              <Button
                mt={5}
                borderRadius="50px"
                h="40px"
                bg={colors.primary_color}
                position="relative"
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                Update Profile Information
              </Button>
              <Box paddingTop={5}>
                <Text
                  width="179px"
                  height="23px"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="23px"
                  color="#2C2C2C"
                >
                  Location
                </Text>
                <HStack paddingTop={2} space={2} mb={5} w="85%">
                  <Entypo name="location-pin" size={20} color="black" />
                  <VStack>
                    <Text
                      width="183px"
                      height="23px"
                      fontStyle="normal"
                      fontWeight="500"
                      font-size="20px"
                      lineHeight="23px"
                    >
                      Turn on Location
                    </Text>
                    <Text>
                      This will help the riders find your donation quicker
                    </Text>
                  </VStack>
                  <Switch size="sm" />
                </HStack>
              </Box>
              <VStack space={2} mb={10}>
                <Heading
                  width="179px"
                  height="23px"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="23px"
                  color="#2C2C2C"
                >
                  Account
                </Heading>
                <Pressable
                  onPress={() => {
                  navigation.navigate("SignIn");
                  auth.signout();
                  toastRef.current = toast.show({
                  title: "logout successful",
                  placement: "top",
                   });
                   }}
                >
                  <HStack space={5}>
                    <MaterialIcons name="logout" size={24} color="black" />
                    <Text>Log Out</Text>
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    </ScrollView>
  );};

export default Profile;
