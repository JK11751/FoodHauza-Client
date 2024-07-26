import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ImageBackground, View, StyleSheet } from 'react-native';
import { colors } from 'theme';
import validator from "validator";
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  FormControl,
  Input,
  Button,
  HStack,
  useToast,
} from 'native-base';
import images from '../../theme/images';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

// const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
    width: screenWidth,
  },
  img: {
    height: '100%',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const toastRef = useRef();
  const showPassword = () => setShow(!show);
  const auth = useAuth();

  const onSubmit = async () => {
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
    } else {
      // ... to save the user to state.
      const userData = {
        "email": email,
        "password": password,
      };
      auth
        .signin(userData)
        .then((response) => {
          if (response.role == "donor") {
            navigation.navigate("DonorDashboard");
          } else if (response.role == "recepient") {
            navigation.navigate("RecepientDashboard");
          } else {
            setError("Login Failed");
          }
        })
        .catch((err) => {
          setError(err.message);
          console.log("upload " + err.message);
        });
    };
  };

  useEffect(() => {
    if (error) {
      showMessage(error);
    }
  }, [error]);

  const showMessage = (errMessage) => {
    if (toastRef.current) {
      toast.close(toastRef.current);
    }
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
        <Box safeArea paddingTop="10px" paddingX="30px" w="100%">
          <Heading
            alignSelf="center"
            size="lg"
            paddingBottom={5}
            _dark={{
              color: "#054544",
            }}
            fontWeight="bold"
          >
            Welcome Back
          </Heading>
          <Text alignSelf="center" color="#054544" fontWeight="semibold" pt={4}>
            Login With
          </Text>
          <HStack
            alignItems="center"
            space={5}
            alignSelf="center"
            pb={5}
            pt={2}
          >
            <FontAwesome5 name="facebook" size={40} color="black" />
            <AntDesign name="google" size={40} color="black" />
          </HStack>

          <Text alignSelf="center" color="#054544" fontWeight="semibold">
            ------------------------ or ------------------------
          </Text>
          <VStack paddingBottom={10}>
            <FormControl paddingBottom={5}>
              <FormControl.Label>Email Address</FormControl.Label>
              <Input
                borderRadius={"40px"}
                placeholder="example@gmail.com"
                type="text"
                value={email}
                onChangeText={val => setEmail(val)}
                bg="#FFFFFF"
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
                onChangeText={val => setPassword(val)}
              />
            </FormControl>
            <Link
              w="100%"
              mt={2}
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              ml="60%"
              href="https://docs.nativebase.io"
              isExternal
            >
              <Text>Forgot Password?</Text>
            </Link>
            <Button
              mt={5}
              borderRadius="50px"
              h="40px"
              bg={colors.primary_color}
              position="relative"
              onPress={onSubmit}
            >
              Sign In
            </Button>
            <HStack mt={1} justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Don't have an account?{" "}
              </Text>
              <Button
                variant="link"
                p="0"
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Create One
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ImageBackground>
    </View>
  );
};
export default SignIn;
