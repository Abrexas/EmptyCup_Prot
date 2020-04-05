import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';

export default class GoDeeper extends Component {

	constructor(props){
		super(props);

		// State Initialization
		this.state = { isClicked: false };
	}

	render(){
		return (
			<TouchableOpacity onPress={() => this.setState(() => ({isClicked: !this.state.isClicked}))}>
				<View style={styles.container}>
					<Text style={{fontWeight: 'bold', color: '#fff', fontSize: 22}}>Go Deeper</Text>
					<Text style={{color: '#fff'}}>{this.state.isClicked ? "true" : "false"}</Text>
				</View>
			</TouchableOpacity>
		);
	}
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
