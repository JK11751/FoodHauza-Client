import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import { colors } from 'theme'
import {
  Box,
  Avatar,
  Text,
  VStack,
} from 'native-base'
import images from '../../theme/images'
import NewDonationPackCard from './Cards/NewDonationPackCard'
import DonationCard from './Cards/DonationCard'
import { DonationPackState } from '../../context'

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
const DonationPackStart = ({navigation}) => {
  const {donationPack} = DonationPackState();
  return (
    <View style={styles.root}>
      <VStack h="100%" w="100%" bg="white">
        <NewDonationPackCard navigation={navigation} />

        {donationPack.length == 0 ? (
          <VStack alignItems="center" justifyContent="center" h="90%">
            <Box alignItems="center">
              <Avatar
                alignItems="center"
                bg="green.500"
                size="2xl"
                source={images.background_img}
              />
              <Text
                paddingTop="20px"
                fontWeight="400"
                fontSize="13px"
                lineHeight="20px"
                fontStyle="normal"
              >
                Add a Donation to get started
              </Text>
            </Box>
          </VStack>
        ) : (
          <VStack h="90%" paddingX="30px">
          <Box>
            {donationPack?.map((donation) => {
              return <DonationCard donation={donation} />;
            })}
          </Box>
          </VStack>
        )}
      </VStack>
    </View>
  );
}

export default DonationPackStart
