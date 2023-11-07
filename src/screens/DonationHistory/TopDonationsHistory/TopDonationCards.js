import React from "react";
import {VStack} from "native-base";
import {Dimensions, View, StyleSheet, ImageBackground} from "react-native";
import { colors } from 'theme'
import images from '../../../theme/images'
import TopDonationsPack from "../TopPacks/TopDonationsPack";
import TopDonationCard from "./TopDonationsCard";
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.lightGrayPurple,
      height: screenHeight,
    },
    img: {
      height: '100%',
      width: screenWidth,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
const TopDonationCards = () => {
  return(   
    <View style={styles.root}>
      <ImageBackground
              source={images.background_img}
              resizeMode="cover"
              style={styles.img}
            >
        <VStack h="100%" w="100%" bg="white">
          <TopDonationsPack/>
          <VStack alignItems='flex-start' justifyContent="center" h="90%"  paddingX="30px" >
            <TopDonationCard/>
            <TopDonationCard/>
          </VStack>
        </VStack>
      </ImageBackground>
    </View>
  );
}
export default TopDonationCards