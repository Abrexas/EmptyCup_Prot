import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

// Imoprt Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen  from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function BottomTabNavigator({ navigation, route }) {
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Login Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
				}}
			/>
			<BottomTab.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					title: 'Register Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code" />,
				}}
			/>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: 'Home Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
				}}
			/>
			<BottomTab.Screen
				name="Links"
				component={LinksScreen}
				options={{
					title: 'Links Screen',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'Login':
			return 'Log In User';
		case 'Home':
			return 'How to get started';
		case 'Links':
			return 'Links to learn more';
		case 'Register':
			return 'Register New User';
	}
}
