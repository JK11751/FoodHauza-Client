import React, { useRef } from 'react'
import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  Text,
  useDisclose,
  useToast,
} from 'native-base'
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { colors } from '../../theme'
import DonationPackSelect from '../../screens/DonationPack/DonationPackSelect'
import { clearPack } from '../../utils/pack.utils'
import { DonationPackState } from '../../context'

const BottomNavDonations = ({ navigation }) => {
  const [selected, setSelected] = React.useState(0)
  const {setDonationPack, donationPack} = DonationPackState()
  const {isOpen, onOpen, onClose} = useDisclose();
  const toast = useToast()
  const toastRef = useRef()
  const navigateToFirstScreen = () => {
    navigation.navigate('SelectLocation')
  }
  return (
    <Box bg="white" safeAreaTop width="100%" alignSelf="center">
      <Center flex={1} />
      <HStack
        bg="white"
        alignItems="center"
        safeAreaBottom
        shadow={6}
        h="60px"
        borderTopRadius="20px"
      >
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            setSelected(0)
            clearPack(setDonationPack)
            toastRef.current = toast.show({
              title: "Cart Cleared",
              placement: "bottom",
            });
            }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "home" : "home-outline"}
                />
              }
              color={colors.primary_color}
              size="lg"
            />
            <Box
              flexDirection="row"
              alignItems="baseline"
            >
              <Text>Clear</Text>
            </Box>
          </Center>
        </Pressable>
        <Pressable
          py="2"
          flex={0}
          mt="-50px"
          alignSelf="center"
          onPress={onOpen}
        >
          <Center
            h="70px"
            w="70px"
            borderRadius="70px"
            bg={colors.primary_color}
          >
            <Icon as={<MaterialIcons name="add" />} color="white" size="4xl" />
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            setSelected(1);
            if (donationPack?.length != 0) {
                navigateToFirstScreen();
            } else {
               toastRef.current = toast.show({
                 title: "Please add at least one donation item to the pack",
                 placement: "bottom",
               });
            }
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="history" />}
              color={colors.primary_color}
              size="lg"
            />
            <Box
              flexDirection="row"
              alignItems="baseline"
            >
              <Text>Done</Text>
            </Box>
          </Center>
        </Pressable>
      </HStack>
      <DonationPackSelect isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default BottomNavDonations
