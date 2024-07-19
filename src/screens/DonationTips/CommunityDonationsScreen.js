import React from 'react';
import { StyleSheet} from 'react-native';
import { colors } from '../../theme';
import {
  Box,
  Pressable,
  HStack,
  ChevronLeftIcon,
  Spacer,
  ScrollView,
  Text,
  View,
  ThreeDotsIcon,
} from "native-base";
import { useNavigation } from '@react-navigation/native';

const CommunityDonationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View flex={1}>
    <Box
    alignItems="center"
    borderBottomLeftRadius="20px"
    borderBottomRightRadius="20px"
    h="70px"
    w="100%"
    bg={colors.primary_color}
    position="relative"
  >
    <HStack paddingTop="20px" alignItems="center">
      <Pressable
        onPress={() => {
          navigation.navigate("DonorDashboard");
        }}
      >
        <ChevronLeftIcon paddingLeft="50px" color="white" />
      </Pressable>
      <Spacer />
      <Text color="#FFFFFF" fontSize="20px" fontWeight="700" >
      Community Donations
      </Text>
      <Spacer />
      <ThreeDotsIcon paddingRight="50px" color="white" />
    </HStack>
  </Box>
    <ScrollView style={styles.container}>
      <Box p="4" backgroundColor="#fff" borderRadius="10px" >

        <Text style={styles.content}>
          Find out how others in your area are donating:
          </Text>
          <Text style={styles.content}>
          - Local donation drives and events.
          </Text>
          <Text style={styles.content}>
          - Stories of community impact and success.
          </Text>
          <Text>
          - How to organize your own donation drive.
          </Text>
          <Text style={styles.content}>
          - Collaborations and partnerships with local businesses and organizations.
        </Text>
      </Box>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default CommunityDonationsScreen;

