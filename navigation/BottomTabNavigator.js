import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

// Imoprt Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MediScreen  from '../screens/MediScreen';
import PlayerScreen from '../screens/PlayerScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function BottomTabNavigator({ navigation, route }) {
	//navigation.setOptions({ headerTitle:  getHeaderTitle(route) });
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
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Login Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
					tabBarVisible: false
				}}
			/>
			<BottomTab.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					title: 'Register Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code" />,
					tabBarVisible: false
				}}
			/>
			<BottomTab.Screen
				name="Medi"
				component={MediScreen}
				options={{
					title: 'Medi Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
					tabBarVisible: false
				}}
			/>
			<BottomTab.Screen
				name="Player"
				component={PlayerScreen}
				options={{
					title: 'Player Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
					tabBarVisible: false,
					headerShown: true,
				}}
			/>
			<BottomTab.Screen
				name="Links"
				component={LinksScreen}
				options={{
					title: 'Links Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
					tabBarVisible: false,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'Login':
			return 'Login User';
		case 'Medi':
			return 'Select a Meditation';
		case 'Links':
			return 'Links to learn more';
		case 'Register':
			return 'Register New User';
		case 'Player':
			return 'Medi Name';
	}
}
