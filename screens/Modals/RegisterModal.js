import React, { useState } from 'react';
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

export default function RegisterScreen(props) {

	//STATE MACHINE
	const [selectedValue, setSelectedValue] = useState("usa");
	const [name, setName] = useState(undefined);
	const [mail, setMail] = useState(undefined);
	const [pass, setPass] = useState(undefined);
	const [home, setHome] = useState(undefined);


	// FUNCTIONS
	function signIn() {
		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(mail, pass)
			.then(() => props.login())
			.catch(error => console.log(error));

		if (firebaseApp.auth().currentUser != null){
			// TOGGLE MODAL
			props.login(name, home);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={{fontSize: 32, color: '#fff'}}>Register</Text>
			<View style={styles.formContainer}>
				<Text style={styles.formText}>Full Name</Text>
				<TextInput style={styles.formInput} placeholder="(required)"/>
				
				<Text style={styles.formText}>Country</Text>
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={selectedValue}
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
					onChangeText={text => { setMail(text) }}
				/>

				<Text style={styles.formText}>Password</Text>
				<TextInput 
					secureTextEntry={true} 
					style={styles.formInput} 
					placeholder="(required)"
					onChangeText={text => { setPass(text) }}
				/>

				<Text style={styles.formText}>Confirm Password</Text>
				<TextInput secureTextEntry={true} style={styles.formInput} placeholder="(required)"/>
			</View>

			<View>
				<TouchableOpacity onPress={() => signIn()}>
					<View style={styles.registerButton}>
						<Text style={{color: '#8af'}}>REGISTER</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
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
