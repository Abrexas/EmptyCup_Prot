import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';

// Imoprt Screens
import LoginScreen    from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import KeyScreen      from '../screens/KeyScreen';
import MediScreen  	 from '../screens/MediScreen';
import PlayerScreen 	 from '../screens/PlayerScreen';
import LinksScreen 	 from '../screens/LinksScreen';

const StackNav = createStackNavigator()
const INITIAL_ROUTE_NAME = 'Login';

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};

export default function AppNavigator({ navigation, route }) {
	navigation.setOptions({ 
		headerShown: (route.state?.routes[route.state.index]?.name  == "Player") ? true : false ,
		headerTitle: getHeaderTitle(route),
		headerStyle: {
			height: 120,
		},
		headerTitleStyle: {
			alignSelf: 'center',
			fontSize: 48
		},
		headerTitleAlign: 'center',
	});

	return (
		<StackNav.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<StackNav.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Login Screen',
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config,
					},
				}}
			/>
			<StackNav.Screen
				name="Key"
				component={KeyScreen}
				options={{
					title: 'Key Screen',
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config,
					},
				}}
			/>
			<StackNav.Screen
				name="Medi"
				component={MediScreen}
				options={{
					title: 'Medi Screen',
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config,
					},
				}}
			/>
			<StackNav.Screen
				name="Player"
				component={PlayerScreen}
				options={{
					title: 'Player Screen',
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config,
					},
				}}
			/>
			<StackNav.Screen
				name="Links"
				component={LinksScreen}
				options={{
					title: 'Links Screen',
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config,
					},
				}}
			/>
		</StackNav.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'Login':
			return 'Login User';
		case 'Key':
			return 'Key Selection';
		case 'Medi':
			return 'Select a Meditation';
		case 'Links':
			return 'Links to learn more';
		case 'Player':
			return 'Medi Name';
	}
}
