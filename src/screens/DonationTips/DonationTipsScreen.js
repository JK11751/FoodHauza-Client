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
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { colors } from "../../theme";

const DonationTipsScreen = () => {
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
          Donation Tips
          </Text>
          <Spacer />
          <ThreeDotsIcon paddingRight="50px" color="white" />
        </HStack>
      </Box>
      <ScrollView style={styles.container}>
        <Box p="4" backgroundColor="#fff" borderRadius="10px" shadow="2">
          
          <Text style={styles.content}>
            When donating food, consider the following tips:
          </Text>
          <Text style={styles.content}>
            - Donate non-perishable items.
          </Text>
          <Text style={styles.content}>
            - Check expiration dates.
          </Text>
          <Text style={styles.content}>
            - Consider donating healthy, nutritious foods.
          </Text>
          <Text style={styles.content}>
            - Avoid glass containers.
          </Text>
          <Text style={styles.content}>
            - Think about items that don't require much preparation.
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

export default DonationTipsScreen;
