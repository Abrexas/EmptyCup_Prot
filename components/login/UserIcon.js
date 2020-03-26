import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function UserIcon(props) {
	return (
		<TouchableOpacity onPress={() => props.navigation.navigate({name: 'Home'})}>
			<View style={styles.iconContainer}>
				<View style={styles.innerIconContainer}></View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		width: 220,
		height: 220,
		backgroundColor: "#fff",
		borderRadius: 110,
		borderWidth: 8,
		borderColor: "#000",
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerIconContainer: {
		width: 150,
		height: 150,
		backgroundColor: "#aaa",
		borderRadius: 75,
		borderWidth: 8,
		borderColor: "#000",
	},
});
