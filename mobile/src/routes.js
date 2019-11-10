import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Profile from './pages/Profile';
import NonFollowers from './pages/NonFollowers';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Profile: createStackNavigator({
            Profile: {
                screen: Profile,
                navigationOptions: {
                    header: null,
                },
            },
            NonFollowers,
        })
    }),
);

export default Routes;