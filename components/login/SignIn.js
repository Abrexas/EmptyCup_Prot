import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Sign In Button
export default function SignIn(props) {
	return (
			<TouchableOpacity onPress={() => props.navigation.navigate({name: 'Home'})}>
				<View style={styles.touchContainer}>
					<Text style={{color: "#64f"}}>Sign In</Text>
				</View>
			</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	touchContainer: {
		justifyContent: 'center', 
		alignItems: 'center', 
		width: 300, 
		height: 48, 
		borderWidth: 2,
		borderRadius: 12, 
		borderColor: "#000", 
		backgroundColor: "#fff"
	},
});
