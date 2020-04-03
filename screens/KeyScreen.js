import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';

export default function KeyScreen(props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => props.navigation.navigate({name: 'Medi'})}>
				<View style={styles.touchContainer}>
					<Text style={{color: "#000"}}>To First Key</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3c3838',
	},
	touchContainer: {
		backgroundColor: '#888',
		width: 300,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#fff',
		borderRadius: 10,
	}
});
