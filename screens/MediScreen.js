import * as React from 'react';
import { 
	Image, 
	Platform, 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View,
	ScrollView
} from 'react-native';

// Import Custom Components
import MediCard from '../components/meditations/MediCard';

export default function MediScreen(props) {

	// Dynamically build MediCard from Array
	let arr = [
		<MediCard key={1} navigation={props.navigation} title="The Blue Tent"/>,
		<MediCard key={2} navigation={props.navigation} title="The Sacred Breath"/>,
		<MediCard key={3} navigation={props.navigation} title="Leaf In The Wind"/>,
		<MediCard key={4} navigation={props.navigation} title="The Stone Circle"/>,
		<MediCard key={5} navigation={props.navigation} title="The Waterfall"/>,
		<MediCard key={6} navigation={props.navigation} title="The Carving Stone"/>,
		<MediCard key={7} navigation={props.navigation} title="The Great Ravine"/>
	];

	return (
		<View style={{flex:1}}>
			<View style={styles.header}>
				<Text style={{fontSize: 48, color: '#fff'}}>The First Key</Text>
			</View>
			<View style={styles.container}>
				<ScrollView>
					{arr}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 200,
		backgroundColor: '#444',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: '#000',
		alignItems: 'center',
	},
});
