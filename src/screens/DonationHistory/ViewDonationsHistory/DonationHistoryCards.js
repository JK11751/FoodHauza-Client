import React from "react";
import {VStack, Center } from "native-base";
import { colors } from 'theme'
import images from '../../../theme/images'
import { Dimensions, View, StyleSheet,ImageBackground } from 'react-native'
import DonationHistoryCard from "./DonationHistoryCard";
import ViewDonationTopPack from "../TopPacks/ViewDonationTopPack";

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
{/*const styles = StyleSheet.create({
    root: {
        bg: "lime.300",
        px: "44px",
        w: "100%",
        height:'400',
        px: "90",
    },
})*/}

const DonationHistoryCards = () => {
  return (
    <View style={styles.root}>
      <ImageBackground
          source={images.background_img}
          resizeMode="cover"
          style={styles.img}
        >
        <VStack h="100%" w="100%" bg="white">
          <ViewDonationTopPack/>
          <VStack alignItems='flex-start' justifyContent="center" h="90%"  paddingX="30px" >
            <DonationHistoryCard/>
            <DonationHistoryCard/>
            <DonationHistoryCard/>
          </VStack>
        </VStack>
      </ImageBackground>
    </View>
    );
}
export default DonationHistoryCards