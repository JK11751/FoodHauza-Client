import { View, Text } from 'react-native'
import React from 'react'
import { Center, HStack, Skeleton, Spinner, VStack } from 'native-base';

const GeneralLoading = () => {
  return (
    <View>
      <Center w="100%">
        <HStack space={2} justifyContent="center">
          <Spinner color="emerald.500" />
          <Spinner color="warning.500" />
          <Spinner color="indigo.500" />
          <Spinner color="cyan.500" />
        </HStack>
      </Center>
    </View>
  );
}

export const SkeletonLoader = () => {
  return (
    <Center w="100%">
      <HStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        rounded="md"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
        p="4"
      >
        <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          <Skeleton startColor="amber.300" />
          <Skeleton.Text />
          <HStack space="2" alignItems="center">
            <Skeleton size="5" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  );
};

export default GeneralLoading