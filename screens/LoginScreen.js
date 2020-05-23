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
	const [regStatus, setRegStatus] = useState(false);

	/* * * * * * * * * * * *   
	  COMPONENT DID UPDATE
	* * * * * * * * * * * */

	useEffect(() => {
		console.log(".. CHECKING ..")
		// LOGIN WITH CREDENTIALS
		if (loginMail != undefined && loginPass != undefined) { 
			// ATTEMPT REGISTRATION
			if (regStatus){
				// AUTH DID UPDATE
				firebaseApp.auth().onAuthStateChanged(function(fbUser) {
					if (fbUser) {
						// SHOULD BE SUCCESSFUL LOGIN
						console.log("Success");
					}
					else {
						// SHOULD BE FAILED LOGIN
						console.log("Failure: "+loginMail+" / "+loginPass);
					}
				});
			}
			else {
				_registerNewUser();
				setRegStatus(true);
				console.log("Time to Try")
			}
		}
	});	


	/* * * * * * * * * * * *   
	 *	     FUNCTIONS      *
    * * * * * * * * * * * */

	// ARREMPT REGISTRATION
	function _registerNewUser() {
		firebaseApp.auth().createUserWithEmailAndPassword(loginMail, loginPass).catch(er => alert(er));
	}

	// OPEN REGISTRATION MODAL
	function _toRegModal() {
		firebaseApp.auth().signOut();
		setLoginName(undefined);
		setLoginMail(undefined);
		setLoginPass(undefined);
		setRegStatus(false);
		setRegVisi(!regVisi);
	}

	// CLOSE MODAL AND INITIALIZE REGISTRATION
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

	// UPDATE USER DATA
	function _updateUserData(uName, uMail, uPass) {
		setLoginName(uName);
		setLoginMail(uMail);
		setLoginPass(uPass);
	}


	/* * * * * * * * * * * *
	 *    RENDER SCREEN    *
	 * * * * * * * * * * * */ 

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
		</View>
	);
}


/* * * * * * * * * * * *
 *         STYLE       *
 * * * * * * * * * * * */ 

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
