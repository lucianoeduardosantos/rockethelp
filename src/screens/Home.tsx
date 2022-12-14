import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import Logo from '../assets/logo_secondary.svg'
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';

import { useState } from 'react';
import { Button } from '../components/Button';

import { useNavigation } from '@react-navigation/native';

export function Home() {
    const {colors} = useTheme();

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');

    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '123',
            patrimony: '123456',
            when: '29/07/2022',
            status: 'open'
        },
        {
            id: '456',
            patrimony: '123456',
            when: '29/07/2022',
            status: 'open'
        }
    ]);


    const navigation = useNavigation();
    function handleNewOrder(){
        navigation.navigate("new");
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton 
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />

            </HStack>

            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Meus chamados
                    </Heading>
                    <Text color="gray.200">
                        3
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter 
                        type="open" 
                        title='Em andamento' 
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter 
                        type="closed" 
                        title='Finalizado' 
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                 </HStack>
                <FlatList 
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Order data={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Voc?? ainda n??o possui {'\n'}
                                solicita????es {statusSelected === "open" ? "em aberto" : "finalizadas" }
                            </Text>
                        </Center>
                    )}
                /> 
                <Button title='Nova solicita????o' onPress={handleNewOrder} />       
            </VStack>         

        </VStack>
    );
}