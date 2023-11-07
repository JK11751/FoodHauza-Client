import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Badge, Box, Flex, HStack, Text, VStack } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../theme'

const NotificationItem = () => {
  return (
    <View>
      <Box h="160px" bg="white" shadow={"30px"} mt="3" p={5} borderRadius={"5px"}>
        <HStack alignItems="center" space="auto">
            <HStack alignItems="center" space={"7px"}>
              <Flex
                h="30px"
                w="30px"
                borderRadius="20px"
                alignItems="center"
                justifyContent="center"
                bg={colors.secondary_color}
              >
                <MaterialCommunityIcons
                  name="motorbike"
                  size={24}
                  color={colors.primary_color}
                />
              </Flex>
                <VStack>
                    <Text bold>Order Received</Text>
                    <HStack space="3px">
                        <Text fontSize="11px" color="gray.400">
                            20th Oct 2022
                        </Text>
                        <Text fontSize="11px" color="gray.400">
                            11:20am
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
          <Badge ml="27%" size={"md"} h="30px" borderRadius="5px" colorScheme={"green"}>
            New
          </Badge>
        </HStack>
        <Text pt="2" w="100%">
          Someone has requested to pick your donation. The location will be
          droped shortly
        </Text>
      </Box>
    </View>
  );
}

export default NotificationItem

const styles = StyleSheet.create({})