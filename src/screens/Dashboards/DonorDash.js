/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
import React  from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { StyleSheet, StatusBar, Text } from "react-native";
// import Button from 'components/Button'
import { colors } from "theme";
import { Box, Flex, Image, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../theme";
import HomeCard from "../../components/HomeCard";
import { useAuth } from "../../hooks/useAuth";
import { BASE_API_URL } from "../../utils/api";

const HomeLinks = [
  {
    title: "Donation Tips",
    description: "Learn about in-need products and our donation guidelines",
    link: "DonationTips",
  },
  {
    title: "My Food Bank",
    description:
      "Learn more about your local food bank and the services they offer",
    link: "FoodBank",
  },
  {
    title: "Community Donations",
    description: "Get the scoop on how others in your area are donating",
    link: "CommunityDonations",
  },
];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  title_desc: {
    color: "white",
  },
  meals_txt: {
    color: `${colors.primary_color}`,
    fontWeight: "bold",
  },
  history: {
    fontWeight: "bold",
    color: `${colors.primary_color}`,
  },
  meals: {
    width: "80%",
  },
});

const DonorDash = ({ navigation }) => {
  const auth = useAuth();
  const [donationCount, setDonationCount] = useState(0);

  useEffect(() => {
    if (auth.user) {
      axios.get(`${BASE_API_URL}/donations/user/${auth.user._id}`)
        .then(response => {
          setDonationCount(response.data.length);
        })
        .catch(error => {
          console.error("Error fetching donation count:", error);
        });
    }
  }, [auth.user]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <VStack h="100%" w="100%" bg="white">
        <VStack w="100%">
          <VStack
            bg={colors.background_color}
            w="100%"
            h="260"
            borderBottomLeftRadius="20px"
            borderBottomRightRadius="20px"
            alignSelf="baseline"
          >
            <Flex
              flexDir="row"
              bg={colors.primary_color}
              p="30px"
              h="130"
              alignItems="center"
              justifyContent="space-between"
              borderBottomLeftRadius="20px"
              borderBottomRightRadius="20px"
            >
              <Box>
                {auth.user ? (
                  <>
                    <Text style={styles.title}>Hi, {auth.user.name}</Text>
                    <Text style={styles.title_desc}>
                      What would you like to donate today?
                    </Text>
                  </>
                ) : (
                  <Text style={styles.title}>Hi, Guest</Text>
                )}
              </Box>
              {auth.user && auth.user.profile_pic && (
                <Image
                  source={{ uri: auth.user.profile_pic }}
                  alt="Profile Picture"
                  size="lg"
                  borderRadius="full"
                />
              )}
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexDir="row"
              p="30px"
            >
              <Image source={images.stats} alt="donation image" />
              <Box ml="15px">
                <Text style={styles.meals}>
                  You’ve provided <Text style={styles.meals_txt}>{donationCount} meals</Text>{" "}
                  worth of food this year
                </Text>
                <Text
                  style={styles.history}
                  onPress={() => navigation.navigate("DonorHistory")}
                >
                  View History
                </Text>
              </Box>
            </Flex>
          </VStack>
        </VStack>
        <VStack h="600">
          {HomeLinks.map((link, index) => (
            <HomeCard
              key={`link-${index}`}
              title={link.title}
              description={link.description}
              onPress={() => navigation.navigate(link.link)}
            />
          ))}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default DonorDash;
