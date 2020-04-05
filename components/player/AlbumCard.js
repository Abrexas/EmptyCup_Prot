import React from 'react';
import {
	View, 
	StyleSheet,
	Dimensions
} from 'react-native';

const AlbumCard = (props) => {
	return (
		<View style={styles.container}>
		</View>
	);
};

let _size = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
	container: {
		width: _size,
		height: _size,
		marginVertical: 60,
		backgroundColor: '#fff',
		borderRadius: _size/5,
	}
});

export default AlbumCard;
