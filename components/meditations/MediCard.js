import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';

const MediCard = (props) => {
	return (
		<View style={{paddingVertical: 6}}>
			<TouchableWithoutFeedback onPress={() => props.navigation.navigate({name: 'Player'})}>
				<View style={styles.container}>
					<Text>{props.title}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

let _width = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		width: _width * 0.8,
		height: 92,
		backgroundColor: "#888",
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: "#000",
		borderWidth: 2,
		borderRadius: 20,
	},
});

export default MediCard;
