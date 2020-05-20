import React, { useState, useEffect } from 'react';
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
	const [user, setUser] = useState(new UserData(Math.floor(Math.random()*10), 'uName', 'uMail'));

	/* STATE MACHINE */
	const [regVisi, setRegVisi] = useState(false);

	// USER VARIABLES
	const [loginMail, setLoginMail] = useState(undefined);
	const [loginName, setLoginName] = useState(undefined);
	const [loginPass, setLoginPass] = useState(undefined);
	const [regFailed, setRegFailed] = useState(false);
	const [register, setRegister]   = useState(false);

	// COMPONENT DID UPDATE
	useEffect(() => {
		// REGISTER NEW USER
		if (register) {
			_registerNewUser();

			// LOGIN WITH CREDENTIALS
			if (loginMail != undefined && loginPass != undefined) { 
				// AUTH DID UPDATE
				firebaseApp.auth().onAuthStateChanged(function(fbUser) {
					if (fbUser) {
						alert("Success");
						props.navigation.navigate({name: 'Key'});
					}
					else {
						console.log("User Error Status: " + fbUser)
						console.log("-> "+loginMail+" | "+loginPass+" <-")
						setRegFailed(true);
						//_toRegModal();
					}
				});
			}

			// REGISTRATION HAS FAILED
			if (regFailed) {
				_toRegModal();
			}
		}
	});	

	// SET USER DATA
	function _togModal(tog, uName, uMail, uPass) { 
		if (tog) {
			if (regVisi){
				// Hide Modal
				setRegVisi(!regVisi);
				
				// Update Local States
				_updateUserData(uName, uMail, uPass)
			}
		}	
	};

	// REGISTRATION ATTEMPT
	function _registerNewUser() {
		console.log("-----------\nLogging in with: name/pass\n"+loginMail+" / "+loginPass+"\n------------")
		firebaseApp.auth().createUserWithEmailAndPassword(loginMail, loginPass).catch(er => alert(er));
	};

	function _updateUserData(uName, uMail, uPass) {
		console.log('Updating User Data...: '+uName+" / "+uMail+" / "+uPass)

		setLoginName(uName);
		setLoginMail(uMail);
		setLoginPass(uPass);
		setRegister(true);
	}

	// OPEN REGISTRATION MODAL
	function _toRegModal() {
		firebaseApp.auth().signOut();
		setLoginName(undefined);
		setLoginMail(undefined);
		setLoginPass(undefined);
		setRegFailed(false);
		setRegister(false);
		setRegVisi(!regVisi);
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
					login={(tog, name, mail, pass) => _togModal(tog, name, mail, pass)}
				/>
			</Modal>

			{/** !REMOVE NAVIGATION FROM HERE! **/}
			<View style={{height: '50%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
				<UserIcon navigation={props.navigation}/>
				<ShowRedux 
					loginName={loginName}
					loginMail={loginMail}
					loginPass={loginPass}
				/>
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
						_toRegModal();
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
