import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
	return (
		<View style={styles.container}>
			<Text style={{fontSize: 32, color: '#fff'}}>Register</Text>
			<View style={styles.formContainer}>
				<Text style={styles.formText}>Full Name</Text>
				<TextInput style={styles.formInput}></TextInput>
				
				<Text style={styles.formText}>Country</Text>
				<TextInput style={styles.formInput}></TextInput>
				
				<Text style={styles.formText}>Email</Text>
				<TextInput style={styles.formInput}></TextInput>

				<Text style={{paddingBottom: 20}}></Text>
				<TextInput style={styles.formInput}></TextInput>
			</View>
			<TouchableOpacity>
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
		borderBottomWidth: 2,
		borderBottomColor:'#888',
	},
	formText: {
		marginTop: 20,
		fontSize: 18,
		color: '#888',
	}
});
