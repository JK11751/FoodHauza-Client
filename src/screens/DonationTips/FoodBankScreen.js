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

const FoodBankScreen = () => {
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
          My Food Bank
          </Text>
          <Spacer />
          <ThreeDotsIcon paddingRight="50px" color="white" />
        </HStack>
      </Box>
    <ScrollView style={styles.container}>
      <Box p="4" backgroundColor="#fff" borderRadius="10px" >
        <Text style={styles.content}>
          Learn more about your local food bank:
          </Text>
          <Text style={styles.content}>
          - Services offered: Food distribution, nutrition education, and advocacy.
          </Text>
          <Text style={styles.content}>
          - Volunteering opportunities: How to get involved and help.
          </Text>
          <Text style={styles.content}>
          - Donation guidelines: What items are most needed.
          </Text>
          <Text style={styles.content}>
          - Contact information: How to reach your local food bank.
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

export default FoodBankScreen;
