import * as React from 'react';
import { 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View,
	Button
} from 'react-native';

// Redux Import
import { useSelector, useDispatch } from 'react-redux';
import { testReducer } from '../actions/index';

// Import Custom Components
import { MonoText } from '../components/StyledText';
import SignIn from '../components/login/SignIn';
import UserIcon from '../components/login/UserIcon';

export default function LoginScreen(props) {

	// Initialize Redux Access
	const dispatch = useDispatch();
	const testPrint = useSelector(state => state.test);

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


			<Button title='Test' onPress={() => console.log(testPrint)} />
			<Button title='Update' onPress={() => dispatch(testReducer())} />
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
