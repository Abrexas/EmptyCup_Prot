import React from 'react';
import {
	View,
	Button,
	StyleSheet,
} from 'react-native';

const ShowRedux = () => {
	return (
		<View style={styles.container}>
			<Button 
				title="DEBUG" 
				onPress={() => {
					console.log("User Data:");
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
	},
	buttonContainer: {
	},
});

export default ShowRedux;
