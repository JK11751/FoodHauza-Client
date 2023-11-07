import React, {useState, useRef, useEffect} from 'react'
import { Dimensions, ImageBackground, View, StyleSheet } from 'react-native'
import { colors } from 'theme'
import {
  Box,
  Heading,
  useToast,
  Avatar,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  Checkbox,
  HStack,
  ScrollView,
  Icon as NIcon,
  IconButton,
} from 'native-base'
import images from '../../theme/images'
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import validator from "validator";

// const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
    overflow: 'scroll'
  },
  img: {
    height: '100%',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
const SignUp = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState("");
  const [error, setError] = useState([]);
  const toast = useToast();
  const toastRef = useRef();
  const showPassword = () => setShow(!show);

  const onSubmitChange = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (validator.isEmpty(email)) {
      setError("Email is empty");
      return false;
    } else if (!emailRegex.test(email.trim())) {
      setError("Email address is invalid");
      return false;
    } else if (validator.isEmpty(password)) {
      setError("Password is empty");
      return false;
    }  else if (validator.isEmpty(name)) {
      setError("Email is empty");
      return false;
    } else {
      const data = {name, email, password, image};
      navigation.navigate("ChooseAccountType", {data});
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
    <ScrollView>
      <ImageBackground
        source={images.background_img}
        resizeMode="cover"
        style={styles.img}
      >
        <Box safeArea padding="40px">
          <Heading
            mt="50px"
            alignSelf="center"
            size="md"
            color="#054544"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Create Account
          </Heading>
          <View>
            <Avatar
              alignSelf="center"
              bg="green.500"
              size="2xl"
              mt="10px"
              source={{
                uri: image
                  ? image
                  : "https://i.pinimg.com/originals/db/40/43/db40433674a9ea8eee9206a49e59f62b.jpg",
              }}
            />
            <IconButton
              colorScheme="teal"
              icon={<NIcon as={Feather} name="camera" />}
              _icon={{
                size: "sm",
              }}
              onPress={selectImage}
              position={"absolute"}
              bottom={2}
              left={55}
              variant={"outline"}
              borderRadius="full"
              size={"sm"}
            />
          </View>
          <VStack space={"10px"}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                borderRadius={"40px"}
                bg="#FFFFFF"
                type="text"
                placeholder="Name"
                value={name}
                onChangeText={(val) => setName(val)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label color="#000000">
                Email address
              </FormControl.Label>
              <Input
                borderRadius={"40px"}
                type="email"
                bg="#FFFFFF"
                placeholder="example@gmail.com"
                value={email}
                onChangeText={(val) => setEmail(val)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                borderRadius={"40px"}
                placeholder="............"
                bg="#FFFFFF"
                type="password"
                value={password}
                onChangeText={(val) => setPassword(val)}
                leftIcon={
                  <NIcon
                    type="font-awesome"
                    name="lock"
                    size={20}
                    color="#14213d"
                  />
                }
                rightIcon={
                  <IconButton
                    onPress={showPassword}
                    colorScheme={"light"}
                    icon={
                      <NIcon
                        as={Feather}
                        name={show ? "eye-off" : "eye"}
                        size={5}
                      />
                    }
                  />
                }
              />
            </FormControl>
            <HStack space={1} mt={2}>
              <Checkbox accessibilityLabel="checkbox"  aria-label="Checkbox" />
              <Text w="90%">
                By clicking create account I agree that i have read and accepted
                the Terms of Use and Privacy Policy
              </Text>
            </HStack>
            <Button
              borderRadius="50px"
              h="40px"
              mt={4}
              bg={colors.primary_color}
              position="relative"
              onPress={onSubmitChange}
            >
              Next
            </Button>
            <HStack justifyContent="center" mt={2}>
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already have an account?{" "}
              </Text>
              <Button
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                variant="ghost"
                p="0"
                onPress={() => navigation.navigate("SignIn")}
              >
                Log in.
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ImageBackground>
    </ScrollView>
  );
}
export default SignUp
