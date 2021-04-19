// import {createStackNavigator, createAppContainer} from 'react-navigation';
import React from 'react';
import ItemDetails from '../screens/ItemDetails';
import CurrentList from '../screens/CurrentList';
import FavoriteList from '../screens/FavoriteList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, Image, Platform} from 'react-native';
 
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CurrentListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CurrentList" component={CurrentList} />
            <Stack.Screen name="ItemDetails" component={ItemDetails} options={({route}) => {
                return {
                    headerTitle: () => {
                        return <Text>{route.params.item.name}</Text>
                    }
                }
            }} />
        </Stack.Navigator>
    )
}

const FavoriteListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavoriteList" component={FavoriteList} />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({color, focused}) => {
                        let image;
                        

                        if (route.name === 'Shopping list') {
                            image = Platform.select({
                                ios: require('../assets/icons/ios-list.png'),
                                android: require('../assets/icons/md-list.png')
                            });
                        } else if (route.name === 'Favorites') {
                            image = Platform.select({
                                ios: focused
                                    ? require('../assets/icons/ios-star.png')
                                    : require('../assets/icons/ios-star-outline.png'),
                                android: focused
                                    ? require('../assets/icons/md-star.png')
                                    : require('../assets/icons/md-star-outline.png')
                            })
                        }

                        return <Image source={image} resizeMode="contain" style={{width: 25, tintColor: color}} />;
                    }

                })}
            >
                
                <Tab.Screen name="Shopping list" component={CurrentListStack} />
                <Tab.Screen name="Favorites" component={FavoriteListStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Tabs

// const CurrentListStack = createStackNavigator({
//     CurrentList: {
//         screen: CurrentList,
//         navigationOptions: {
//             headerTitle: 'Shopping List'
//         }
//     },
//     ItemDetails: {
//         screen: ItemDetails,
        
//     }
// });

// export default createAppContainer(CurrentListStack);
