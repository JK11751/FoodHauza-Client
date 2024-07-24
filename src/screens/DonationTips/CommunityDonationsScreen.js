import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import {images} from '../../theme';
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
  Image,
  Divider,
  VStack,
  Icon,
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const CommunityDonationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View flex={1} bg={colors.background}>
      <Box
        alignItems="center"
        borderBottomLeftRadius="20px"
        borderBottomRightRadius="20px"
        h="70px"
        w="100%"
        bg={colors.primary_color}
        position="relative"
      >
        <HStack paddingTop="20px" alignItems="center" w="100%">
          <Pressable
            onPress={() => {
              navigation.navigate("DonorDashboard");
            }}
          >
            <ChevronLeftIcon paddingLeft="50px" color="white" />
          </Pressable>
          <Spacer />
          <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
            Community Donations
          </Text>
          <Spacer />
          <Pressable>
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </Pressable>
        </HStack>
      </Box>
      <ScrollView style={styles.container}>
        <Box p="4" backgroundColor="#fff" borderRadius="10px" mb="4">
          <Image
            source={images.donation_img}
            alt="Community Donation Banner"
            borderRadius="10px"
            mb="4"
            height="150px"
            width="100%"
          />
          <Text style={styles.title}>
            Discover Community Donations
          </Text>
          <Text style={styles.description}>
            Learn how your community is contributing and how you can get involved.
          </Text>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="event" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Local donation drives and events.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={FontAwesome5} name="hands-helping" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Stories of community impact and success.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={FontAwesome5} name="people-carry" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              How to organize your own donation drive.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="business" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Collaborations and partnerships with local businesses and organizations.
            </Text>
          </HStack>
          <Divider my="2" />
          <Text style={styles.additionalInfo}>
            For more information on how to get involved or to share your own donation stories, contact us at
            <Text style={styles.contact}> community@example.com</Text>
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
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary_color,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: colors.text_secondary,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
    color: colors.text_primary,
  },
  additionalInfo: {
    fontSize: 16,
    marginTop: 20,
    color: colors.text_primary,
    textAlign: "center",
  },
  contact: {
    fontWeight: "700",
    color: colors.primary_color,
  },
});

export default CommunityDonationsScreen;
