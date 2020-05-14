import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	TextInput, 
	TouchableOpacity, 
	Picker 
} from 'react-native';

// FIREBASE IMPORTS
import { firebaseApp } from '../fb/config';

export default class RegisterScreen extends Component {

	constructor(props) {
		super(props);
		// STATE MANAGEMENT
		this.state = {
			name: '',
			mail: '',
			pass: '',
			conf: '',
			home: undefined,
			hasError: false,
		};
	}

	// LOG OUT ON LAUNCH
	componentDidMount() {
		firebaseApp.auth().signOut();
	}

	// CHECK FOR AUTH_STATE_CHANGE
	componentDidUpdate() {
		/*(props)
		firebaseApp.auth().onAuthStateChanged(function(user) {
			if (user) {
				// SIGN-IN APPROVED
				props.login(true, props.name, props.mail)
			} else {
				// No user is signed in.
			}
		});
		*/
	}

	// FUNCTIONS
	validate_signIn() {
		
		var approved = true;
		var error_log = [];

		// CHECK EMAIL LENGTH
		if (this.state.mail.length = 0) {
			error_log.push("Email Is Required")
		}
		// CHECK EMAIL FORMATTING
		if (!this.isValidEmail(this.state.mail)) { 
			error_log.push("Invalid Email");
			approved = false;
		}
		// CHECK PASSWORD ALPHANUMERIC
		if (!this.isAlphanumeric(this.state.pass)) {
			error_log.push("Passwords must container Letters AND Numbers");
			approved = false;
		}
		// CHECK PASSWORD LENGTH
		if (this.state.pass.length < 6) {
			error_log.push("Password must be at least 6 characters in length.");
			approved = false;
		}
		// CHECK PASSWORD CONFIRMATION
		if (this.state.pass !== this.state.conf) {
			error_log.push("Password does NOT match Confirmation.")
			approved = false;
		}

		// REGISTRATION APPROVED
		if (approved) {
			console.log("Validation Approved");
			this.signIn();
		}
		else {
			alert('-' + error_log.join('\n- '));
			console.log("Failed: -Validation");
		}
	}

	// VERIFY EMAIL FORMAT
	isValidEmail(str) {
		var val = str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);

		return (val != null);
	}
	// VERIFY THAT PASSWORD IS ALPHANUMERIC
	isAlphanumeric(str) {
		var hasNum = str.match(/[0-9]/g);
		var hasLet = str.match(/[a-z,A-Z]/g);

		return (hasNum != null && hasLet != null);
	}


	signIn() {
		// ATTEMPT LOGIN
		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(this.state.mail, this.state.pass)
			.catch((error) => {
				alert(error)
				console.log(error)
			}
		);

		firebaseApp.auth().onAuthStateChanged(function(user) {
			if (user) {
				// SIGN-IN APPROVED
				console.log("The shit worked!")
				alert("!!!")
				//props.login(true, props.name, props.mail)
			} else {
				// No user is signed in.
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 32, color: '#fff'}}>Register</Text>
				<View style={styles.formContainer}>
					<Text style={styles.formText}>Full Name</Text>
					<TextInput 
						style={styles.formInput} 
						placeholder="(required)"
						onValueChange={text => {
							this.setState({ name: text }) 
							props.name = text;
						}}
					/>

					<Text style={styles.formText}>Country</Text>
					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={this.state.home}
							style={{color: "#fff"}}
							onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
						>
							<Picker.Item label="USA" 		value="usa" />
							<Picker.Item label="Spain" 	value="spain" />
							<Picker.Item label="France" 	value="france" />
							<Picker.Item label="Germany" 	value="germany" />
						</Picker>
					</View>

					<Text style={styles.formText}>Email</Text>
					<TextInput 
						style={styles.formInput} 
						placeholder="(required)"
						onChangeText={text => { this.setState({ mail: text }) }}
					/>

					<Text style={styles.formText}>Password</Text>
					<TextInput 
						secureTextEntry={true} 
						style={styles.formInput} 
						placeholder="(required)"
						onChangeText={text => { this.setState({ pass: text }) }}
					/>

					<Text style={styles.formText}>Confirm Password</Text>
					<TextInput 
						secureTextEntry={true} 
						style={styles.formInput} 
						placeholder="(required)"
						onChangeText={text => { this.setState({ conf: text }) }}
					/>
				</View>

				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%',  alignItems: 'center'}}>
					<TouchableOpacity onPress={() => this.validate_signIn()}>
						<View style={styles.registerButton}>
							<Text style={{color: '#8af'}}>REGISTER</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity 
						onPress={() => {
							firebaseApp.auth().signOut();
							console.log("..........")
						}}
					>
						<View style={{
							width: 40, 
							height: 40, 
							borderRadius: 20, 
							borderWidth: 2, 
							alignItems: 'center', 
							justifyContent: 'center', 
							backgroundColor: '#888'
						}}>
							<Text>...</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3c3838',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	formContainer: {
		width: '80%',
		alignItems: 'flex-start',
	},
	formInput: {
		height: 32,
		width: '100%',
		marginBottom: 10,
		color: "#fff",
		borderBottomWidth: 2,
		borderBottomColor:'#888',
	},
	formText: {
		marginTop: 20,
		fontSize: 18,
		color: '#888',
	},
	pickerContainer: {
		width: "100%",
		height: 50,
		color: "#fff",
		borderBottomWidth: 2,
		borderBottomColor: "#888",
	},
	registerButton: {
		width: 250, 
		height: 48, 
		backgroundColor: '#fff', 
		borderRadius: 10, 
		alignItems: 'center', 
		justifyContent: 'center',
	},
});
