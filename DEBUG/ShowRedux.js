import React from 'react';
import {
	View,
	Button,
	StyleSheet,
} from 'react-native';

// Redux Import
import { useSelector, useDispatch } from 'react-redux';
import { testReducer } from '../actions/index';
import UserData from '../user/data'

const ShowRedux = (props) => {
	return (
		<View style={styles.container}>
			<Button 
				title="DEBUG" 
				onPress={() => {
					console.log("User Data:");
					//console.log("ID: "+user.id);
					console.log(" | Local: "+props.loginName);
					console.log(" | Local: "+props.loginMail);
					console.log(" | Local: "+props.loginPass);
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
