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
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { images } from "../../theme";

const DonationTipsScreen = () => {
  const navigation = useNavigation();

  const tips = [
    { id: "tip1", icon: MaterialIcons, iconName: "kitchen", text: "Donate non-perishable items." },
    { id: "tip2", icon: FontAwesome5, iconName: "calendar-check", text: "Check expiration dates." },
    { id: "tip3", icon: AntDesign, iconName: "Safety", text: "Consider donating healthy, nutritious foods." },
    { id: "tip4", icon: MaterialIcons, iconName: "no-food", text: "Avoid glass containers." },
    { id: "tip5", icon: FontAwesome5, iconName: "concierge-bell", text: "Think about items that don't require much preparation." },
  ];

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
          {tips.map((tip) => (
            <React.Fragment key={tip.id}>
              <HStack alignItems="center">
                <Icon as={tip.icon} name={tip.iconName} size="6" color={colors.primary_color} mr="2" />
                <Text style={styles.content}>
                  {tip.text}
                </Text>
              </HStack>
              <Divider my="2" />
            </React.Fragment>
          ))}
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
