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
  Icon,
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const FoodBankScreen = () => {
  const navigation = useNavigation();

  return (
    <View flex={1} bg={colors.background}>
      <Box
        alignItems="center"
        borderBottomLeftRadius="20px"
        borderBottomRightRadius="20px"
        h="100px"
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
            My Food Bank
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
            alt="Food Bank Banner"
            borderRadius="10px"
            mb="4"
            height="200px"
            width="100%"
          />
          <Text style={styles.title}>
            Learn About Your Local Food Bank
          </Text>
          <Text style={styles.description}>
            Discover the services offered, volunteer opportunities, and how you can help.
          </Text>
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="local-dining" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Services offered: Food distribution, nutrition education, and advocacy.
            </Text>
          </HStack>
          
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={FontAwesome5} name="hands-helping" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Volunteering opportunities: How to get involved and help.
            </Text>
          </HStack>
          
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="playlist-add-check" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Donation guidelines: What items are most needed.
            </Text>
          </HStack>
         
          <Divider my="2" />
          <HStack alignItems="center">
            <Icon as={MaterialIcons} name="contact-phone" size="6" color={colors.primary_color} mr="2" />
            <Text style={styles.content}>
              Contact information: How to reach your local food bank.
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

export default FoodBankScreen;
