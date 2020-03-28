import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';

export default function RegisterScreen(props) {

	// State Management
	const [selectedValue, setSelectedValue] = useState("usa");

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
						<Picker.Item label="USA" value="usa" />
						<Picker.Item label="Spain" value="spain" />
						<Picker.Item label="France" value="france" />
						<Picker.Item label="Germany" value="germany" />
					</Picker>
				</View>

				<Text style={styles.formText}>Email</Text>
				<TextInput style={styles.formInput} placeholder="(required)"/>

				<Text style={styles.formText}>Password</Text>
				<TextInput secureTextEntry={true} style={styles.formInput} placeholder="(required)"/>

				<Text style={styles.formText}>Confirm Password</Text>
				<TextInput secureTextEntry={true} style={styles.formInput} placeholder="(required)"/>
			</View>
			<TouchableOpacity onPress={() => props.navigation.navigate({name: 'Home'})}>
				<View style={{width: 250, height: 48, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{color: '#8af'}}>REGISTER</Text>
				</View>
			</TouchableOpacity>
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
});
