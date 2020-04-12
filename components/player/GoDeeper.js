import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';


const GoDeeper = (props) => {

	let Content = [];
	for (var i = 0; i < props.deeperData.length; i++){
		let msg = props.deeperData[i].msg;
		Content.push(
			<TouchableOpacity onPress={() => {alert(msg)}}>
				<View style={styles.contentContainer}>
					<Text style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>{props.deeperData[i].title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity onPress={() => {props.scroll()}}>
			<View style={styles.container}>
				<Text style={{fontWeight: 'bold', color: '#fff', fontSize: 22}}>Go Deeper</Text>
				{Content}
			</View>
		</TouchableOpacity>
	);
}

let _width = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#888',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: _width*0.8,
		height: 300,
		paddingBottom: 30,
		borderRadius: 20
	},
	contentContainer: {
		height: 60,
		width: _width*0.6,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#444',
		borderWidth: 2,
		borderColor: '#000',
		borderRadius: 15
	}
});

export default GoDeeper;
