import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import {
  Box,
  Text,
  ThreeDotsIcon,
  HStack,
  Spacer,
  ChevronLeftIcon,
  Pressable,
} from 'native-base'
import { colors } from '../../../theme'

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  img: {
    height: '100%',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
const TopDonationsPack = ({navigation}) => (
  <View style={styles.root}>
    <Box backgroundColor="#FFFFFF">
      <Box
        alignItems="center"
        borderBottomLeftRadius="20px"
        borderBottomRightRadius="20px"
        h="70px"
        w={screenWidth}
        bg={colors.primary_color}
        position="relative"
        onPress={() => {
          navigation.navigate("NewDonationPack");
        }}
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
          <Text color="#FFFFFF" fontSize="20px" fontWeight="700">
            Top Donations
          </Text>
          <Spacer />
          <ThreeDotsIcon paddingRight="50px" color="white" />
        </HStack>
      </Box>
    </Box>
  </View>
);
export default TopDonationsPack
