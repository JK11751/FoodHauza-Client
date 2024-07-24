import React from "react";
import { StyleSheet } from "react-native";
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
  Icon,
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { colors } from "../../theme";
import { MaterialIcons, FontAwesome5, AntDesign  } from '@expo/vector-icons';
import { images } from "../../theme";

const DonationTipsScreen = () => {
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
            Donation Tips
          </Text>
          <Spacer />
          <Pressable>
            <ThreeDotsIcon paddingRight="50px" color="white" />
          </Pressable>
        </HStack>
      </Box>
      <ScrollView style={styles.container}>
        <Box p="4" backgroundColor="#fff" borderRadius="10px" shadow="2" mb="4">
          <Image
          source={images.donation_img}
            alt="Donation Tips Banner"
            borderRadius="10px"
            mb="4"
            height="200px"
            width="100%"
          />
          <Text style={styles.title}>
            Tips for Donating Food
          </Text>
          <Text style={styles.description}>
            Follow these tips to ensure your donations are useful and safe.
          </Text>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="kitchen" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Donate non-perishable items.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={FontAwesome5} name="calendar-check" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Check expiration dates.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={AntDesign } name="Safety" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Consider donating healthy, nutritious foods.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="no-food" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Avoid glass containers.
            </Text>
          </HStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={FontAwesome5} name="concierge-bell" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Think about items that don't require much preparation.
            </Text>
          </HStack>
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
});

export default DonationTipsScreen;
