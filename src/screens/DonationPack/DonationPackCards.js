import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ImageBackground, View, StyleSheet } from 'react-native'
// import {AiOutlineEdit} from "react-icons/ai";
import { colors } from 'theme'
import {
  Box,
  Flex,
  Button,
  VStack,
} from 'native-base'
import DonationCard from './Cards/DonationCard'
import NewDonationPackCard from './Cards/NewDonationPackCard'

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

const DonationPackCards = ({ navigation }) => (
  <View style={styles.root}>
    <VStack h="100%" w="100%" bg="white">
      <NewDonationPackCard />
      <VStack justifyContent="center" h="90%" paddingX="30px">
        {/* <Box alignItems="center" h="30%"> */}
        <Box backgroundColor="#FFFFFF">
          <DonationCard />
          <DonationCard />
          <DonationCard />
          <DonationCard />
          <DonationCard />
        </Box>
      </VStack>
      <Flex flexDir="row" h="20%" justifyContent="center">
        <Button
          borderRadius="50px"
          h="50px"
          w="80%"
          textAlign="center"
          bg={colors.primary_color}
          position="relative"
          onPress={() => {
            navigation.navigate('SelectLocation')
          }}
        >
          Done
        </Button>
      </Flex>
      {/* <Box>
        <BottomTabCard />
      </Box> */}
    </VStack>
  </View>
)
export default DonationPackCards
