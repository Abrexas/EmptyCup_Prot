import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import Custom Components
import { MonoText } from '../components/StyledText';
import SignIn from '../components/login/SignIn';
import UserIcon from '../components/login/UserIcon';

export default function LoginScreen(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Sign In</Text>
			{/** !REMOVE NAVIGATION FROM HERE! **/}
			<UserIcon navigation={props.navigation}/>
			<View>
				<SignIn navigation={props.navigation}/>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
					<TouchableOpacity>
						<Text style={{color: "#888"}}>Forgot Password?</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text style={{color: "#888"}}>Switch Account</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity onPress={() => props.navigation.navigate({name: 'Register'})} style={{alignItems: 'center'}}>
				<Text style={{color: '#fff'}}>REGISTER</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3c3838',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	header: {
		fontSize: 32,
		color: '#fff',
	},
});
