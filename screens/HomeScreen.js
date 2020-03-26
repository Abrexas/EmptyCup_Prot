import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<MonoText>Home Screen</MonoText>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
});
