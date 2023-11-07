import React from "react";
import {Dimensions, ImageBackground, View, StyleSheet} from "react-native";
import {colors} from "theme";
import {Box, Button, Image, Text} from "native-base";
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  img: {
    height: "100%",
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Onboarding = ({navigation}) => (
  <View style={styles.root}>
    <ImageBackground
      source={images.background_img}
      resizeMode="cover"
      style={styles.img}
    >
      <Box safeArea padding="40px">
        <Image
          source={images.donation_img}
          h="350px"
          mt="-50px"
          ml="6px"
          alt="donation image"
        />
        <Box
          alignSelf="center"
          borderRadius="1299px"
          h="1299px"
          w="1299px"
          backgroundColor="white"
          position="absolute"
          top="300px"
          left="-475px"
        />
        <Box>
          <Text fontSize="6em" pt="60px" fontWeight="bold" textAlign="center">
            Making <Text color={`${colors.primary_color}`}>Food</Text>
          </Text>
          <Text fontSize="6em" pt="30px" fontWeight="bold" textAlign="center">
            Donation Easier
          </Text>
          <Text textAlign="center" pt="20px" fontWeight="400" color="gray.500">
            Get to donate your excess foodstuff and groceries to help put a
            smile on someone’s face today
          </Text>
          <Button
            borderRadius="50px"
            h="50px"
            bg={colors.primary_color}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            position="relative"
            bottom="-70px"
          >
            Getting Started
          </Button>
        </Box>
      </Box>
    </ImageBackground>
  </View>
);

export default Onboarding;
