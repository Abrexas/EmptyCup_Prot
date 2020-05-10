import React, { useState } from 'react';
import { 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View,
	Button,
	Modal,
} from 'react-native';

// FIREBASE IMPORTS
import { firebaseApp } from './fb/config';

// Redux Import
import { useSelector, useDispatch } from 'react-redux';
import { testReducer } from '../actions/index';

// Import Custom Components
import { MonoText } from '../components/StyledText';
import SignIn from '../components/login/SignIn';
import UserIcon from '../components/login/UserIcon';
import RegisterModal from './Modals/RegisterModal';

export default function LoginScreen(props) {

	// INITIALIZE REDUX 
	const dispatch = useDispatch();
	const testPrint = useSelector(state => state.test);

	// STATE MACHINE
	const [regVisi, setRegVisi] = useState(true);
	function _togModal() { setRegVisi(!regVisi); };

	return (
		<View style={styles.container}>
			{/** MODAL FOR REGISTRATION **/}
			<Modal
				animationType="slide"
				transparent={false}
				visible={regVisi}
				onRequestClose={() => {
					_togModal();	
				}}
			>
				<RegisterModal login={() => _togModal()}/>
			</Modal>

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

			{/*<TouchableOpacity onPress={() => props.navigation.navigate({name: 'Register'})} style={{alignItems: 'center'}}>*/}
			<TouchableOpacity 
				onPress={() => setRegVisi(!regVisi)} 
				style={{alignItems: 'center'}}
			>
				<Text style={{color: '#fff'}}>REGISTER</Text>
			</TouchableOpacity>

			<View style={{width: 300, flexDirection: 'row', justifyContent: 'space-around'}}>
				<Button title='Test'   onPress={() => console.log(testPrint)} />
				<Button 
					title='push'
					onPress={() => {
						const user = firebaseApp.auth().currentUser;
						firebaseApp.database().ref('users/' + user.uid).set({
							highscore: 101,
						});
					}} 
				/>
				<Button title='Update' onPress={() => dispatch(testReducer())} />
			</View>
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
