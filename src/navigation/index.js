// import {createStackNavigator, createAppContainer} from 'react-navigation';
import React from 'react';
import CurrentList from '../screens/CurrentList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="currentList" component={CurrentList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CurrentListStack;

// const CurrentListStack = createStackNavigator({
//     CurrentList: {
//         screen: CurrentList,
//     }
// });

// export default createAppContainer(CurrentListStack);
