import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { colors } from "theme";
import { Box, Heading, Button, Text, useToast, HStack } from "native-base";
import images from "../../theme/images";
import { useAuth } from "../../hooks/useAuth";

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
  otpBox: {
    borderWidth: 1,
    borderColor: colors.primary_color,
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  otpInput: {
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
});

const VerifyOTP = ({ route, navigation }) => {
  const { userId } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
  const auth = useAuth();
  const toast = useToast();
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          displayToast("OTP has expired", "error");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const displayToast = (message, status) => {
    toast.show({
      title: message,
      status,
      placement: "top",
    });
  };

  const onSubmitOtp = async () => {
    if (timeLeft === 0) {
      displayToast("OTP has expired", "error");
      return;
    }

    const otpString = otp.join("");
    try {
      const user = await auth.verifyOTP(userId, otpString);
      displayToast("OTP verified successfully!", "success");

      switch (user.role) {
        case "donor":
          navigation.navigate("DonorDashboard");
          break;
        case "recepient":
          navigation.navigate("RecepientDashboard");
          break;
        default:
          navigation.navigate("Onboarding");
          break;
      }
    } catch (err) {
      displayToast(err.message, "error");
      setError(err.message);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input if current input is not empty and it's not the last input
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, event) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendOtp = async () => {
    try {
      await auth.resendOTP(userId);
      setTimeLeft(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
      displayToast("OTP resent successfully!", "success");
    } catch (err) {
      displayToast("Failed to resend OTP", "error");
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={images.background_img}
        resizeMode="cover"
        style={styles.img}
      >
        <Box safeArea padding="40px">
          <Heading
            alignSelf="center"
            size="md"
            color="#054544"
            fontWeight="semibold"
          >
            Enter OTP
          </Heading>
          <HStack justifyContent="center" mt={5}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpBox}>
                <TextInput
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={(event) => handleKeyPress(index, event)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              </View>
            ))}
          </HStack>
          <Text mt={2} color="red.500" fontWeight={400} textAlign="center">
            {timeLeft > 0
              ? `OTP expires in ${timeLeft} seconds`
              : "OTP has expired"}
          </Text>
          <Button
            borderRadius="50px"
            h="40px"
            mt={4}
            bg={colors.primary_color}
            position="relative"
            onPress={onSubmitOtp}
          >
            Submit
          </Button>
          {timeLeft === 0 && (
            <Button
              borderRadius="50px"
              h="40px"
              mt={4}
              bg={colors.primary_color}
              position="relative"
              onPress={resendOtp}
            >
              Resend OTP
            </Button>
          )}
        </Box>
      </ImageBackground>
    </View>
  );
};

export default VerifyOTP;
