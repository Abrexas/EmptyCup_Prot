import React, { useState } from 'react';
import { 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View,
	Button,
	Modal,
	TextInput,
} from 'react-native';

// FIREBASE IMPORTS
import { firebaseApp } from './fb/config';

// Redux Import
import { useSelector, useDispatch } from 'react-redux';
import { testReducer } from '../actions/index';
import UserData from '../user/data'

// Import Custom Components
import { MonoText } from '../components/StyledText';
import SignIn from '../components/login/SignIn';
import UserIcon from '../components/login/UserIcon';
import RegisterModal from './Modals/RegisterModal';
import ShowRedux from '../DEBUG/ShowRedux';

export default function LoginScreen(props) {

	// INITIALIZE REDUX 
	const dispatch = useDispatch();
	const testPrint = useSelector(state => state.test);

	/* STATE MACHINE */
	//const user = firebaseApp.auth().currentUser;
	const [regVisi, setRegVisi] = useState(false);
	// USER VARIABLES
	const [loginMail, setLoginMail] = useState(undefined);
	const [loginName, setLoginName] = useState(undefined);
	const [user, setUser] = useState(new UserData(Math.floor(Math.random()*10), 'uName', 'uMail'));

	// ______IMPLEMENT REDUX________
	//const [user, pass] = null;
				/*
				firebaseApp.database().ref('users/' + user.uid).set({
					Username: "Tohzt",
					Country: "USA"
				});
				*/

	// SET USER DATA
	function _togModal(tog, uName, uMail) { 
		if (tog) {
			if (regVisi){
				console.log("User Info:");

				setRegVisi(!regVisi);
				
				// UPDATE USER DATA
				_updateUserData(uName, uMail)
			}
		}	
	};

	function _updateUserData(uName, uMail) {
		console.log('Updating User Data...: '+uName+" / "+uMail)

		setLoginName(uName);
		setLoginMail(uMail);
	}

	return (
		<View style={styles.container}>
			{/** MODAL FOR REGISTRATION **/}
			<Modal
				animationType="slide"
				transparent={false}
				visible={regVisi}
				onRequestClose={() => {
					setRegVisi(!regVisi);
				}}
			>
				<RegisterModal 
					login={(tog, name, mail) => _togModal(tog, name, mail)}
					name='_name_'
					mail='_mail_'
				/>
			</Modal>

			{/** !REMOVE NAVIGATION FROM HERE! **/}
			<View style={{height: '50%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
				<UserIcon navigation={props.navigation}/>
				<ShowRedux/>
			</View>

			{/* SIGN IN CREDENTIALS */}
			<View style={styles.subContainer}>
				<TextInput 
					style={styles.formInput} 
					placeholder="MyEmail@domain.com"
					onChangeText={text => { setLoginEmail(text) }}
				/>
				<View style={{paddingVertical: 4}} />
				
				<TextInput 
					style={styles.formInput} 
					placeholder="Password"
					onChangeText={text => { setLoginPass(text) }}
				/>

				<View style={{paddingVertical: 4}} />

				{/*------------------------------
				----------TEST-BUTTON---------*/}
				<TouchableOpacity
					onPress={() => {
						console.log("ID: "+user.id);
						console.log("Name: "+user.name+" > "+loginName);
						console.log("Email: "+user.mail+" > "+loginMail);
					}}
				>
					<View style={{
						backgroundColor: '#348', 
						height: 32, 
						width: 200, 
						borderRadius: 16, 
						alignItems: 'center', 
						justifyContent: 'center'
					}}>
						<Text style={{color: 'white'}}>TEST BUTTON</Text>
					</View>
				</TouchableOpacity>

			</View>

			<View style={styles.subContainer}>
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
				<View style={{paddingVertical: 4}} />

				<TouchableOpacity style={{alignItems: 'center'}}
					onPress={() => {
						firebaseApp.auth().signOut();
						setRegVisi(!regVisi);
					}} 
				>
					<Text style={{color: '#fff'}}>REGISTER</Text>
				</TouchableOpacity>
			</View>

			{/*
				<View style={{width: 300, flexDirection: 'row', justifyContent: 'space-around'}}>
					<Button title='Test'   onPress={() => console.log(testPrint)} />
					<Button 
						title='push'
						onPress={() => {
							console.log('...');
						}} 
					/>
					<Button title='Update' onPress={() => dispatch(testReducer())} />
				</View>
			*/}
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
	formInput: {
		height: 48,
		width: '70%',
		color: "#000",
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor:'#000',
		borderRadius: 10,
		textAlign: 'center',
	},
	subContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
