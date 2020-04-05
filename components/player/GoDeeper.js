import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';

export default function GoDeeper() {
	return (
		<TouchableOpacity onPress={() => alert('pop')}>
			<View style={styles.container}>
				<Text stle={{fontColor: '#fff', fontSize: 32}}>Go Deeper</Text>
			</View>
		</TouchableOpacity>
	);
}

let _width = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#444',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: _width*0.8,
		height: 300,
		borderWidth: 4,
		borderColor: '#f00',
	},
});
