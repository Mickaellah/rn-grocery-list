import {createStackNavigator, createAppContainer} from 'react-navigation';
import CurrentList from '../screens/CurrentList';

const CurrentListStack = createStackNavigator({
    CurrentList: {
        screen: CurrentList,
    }
});

export default createAppContainer(CurrentListStack);