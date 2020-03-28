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
import { MonoText } from '../components/StyledText';
import MediCard from '../components/meditations/MediCard';

export default function HomeScreen() {
	return (
		<View style={{flex:1}}>
			<View style={styles.header}>
				<Text style={{fontSize: 48, color: '#fff'}}>The First Key</Text>
			</View>
			<View style={styles.container}>
				<ScrollView>
					<MonoText>Home Screen</MonoText>
					<MediCard title="The Blue Tent"/>
					<MediCard title="The Sacred Breath"/>
					<MediCard title="Leaf In The Wind"/>
					<MediCard title="The Stone Circle"/>
					<MediCard title="The Waterfall"/>
					<MediCard title="Carving Stone"/>
					<MediCard title="The Great Ravine"/>
				</ScrollView>
			</View>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

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
