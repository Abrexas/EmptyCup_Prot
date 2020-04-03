import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	TouchableOpacity, 
	Slider,
	Button 
} from 'react-native';
import { Audio } from 'expo-av';

// Import Custom Components
import AlbumCard from '../components/player/AlbumCard';

export default class Media_PlayPause extends Component {

	constructor(props) {
		super(props);

		// State manager
		this.state = { 
			isLoaded: false,
			isPlaying: false, 
			mediaText: " > ",
			soundObject: new Audio.Sound(),
			time_current: 0,
			time_duration: 0,
		};
	}

	componentDidMount() {
		try {
			(async() => {
				await this.state.soundObject.loadAsync(require('../assets/sounds/Menu.mp3'));
			})();
		} catch (err) {
			console.error(err);
		}

		// Enable access to playback status
		this.state.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
	}

	// Confirm soundObject is Loaded
	_onPlaybackStatusUpdate = playbackStatus => {
		if (playbackStatus.isLoaded && !this.state.isLoaded) {
			this.setState(() => ({ isLoaded: true }))
			this.setState(() => ({ time_duration: playbackStatus.durationMillis }))
		}
		
		if (playbackStatus.isPlaying) {
			this.setState(() => ({ time_current: playbackStatus.positionMillis }))
		}
		
	}

	_toTime(s) {
		var ms = s % 1000;
		s = (s - ms) / 1000;
		var secs = s % 60;
		s = (s - secs) / 60;
		var mins = s % 60;
		var hrs = (s - mins) / 60;

		if (hrs > 0)
			return hrs + ':' + mins + ':' + secs;
		
		return mins + ':' + secs;
	}

	/* ------- Media Functions --------- */

	_toggle_PlayPause() {
		if (this.state.isLoaded)
		{
			if (this.state.isPlaying){
				this.setState(() => ({ isPlaying: false }))
				this.setState(() => ({ mediaText: " > " }))
				this.state.soundObject.pauseAsync()
			}
			else {	
				this.setState(() => ({ isPlaying: true }))
				this.setState(() => ({ mediaText: " || " }))
				this.state.soundObject.playAsync();
			}
		}
	}

	_skip(dir) {
		this.state.soundObject.playFromPositionAsync(this.state.time_current + dir*10000);
	}

	// Temporary Killswitch
	_kill_Audio() { this.state.soundObject.stopAsync(); }

	render() {		
		return (
			<View style={styles.container}>
				<AlbumCard />
				<View style={styles.mediaContainer}>
					<TouchableOpacity style={styles.buttonContainer} onPress={ () => this._skip(-1) }>
						<Text> -10 </Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonContainer} onPress={ () => this._toggle_PlayPause() }>
						<Text>{this.state.mediaText}</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonContainer} onPress={ () => this._skip(1) }>
						<Text> +10 </Text>
					</TouchableOpacity>

					{/*
					<TouchableOpacity style={styles.buttonContainer} onPress={ () => this._kill_Audio() }>
						<Text>Stop</Text>
					</TouchableOpacity>
					*/}
				</View>
				<View style={styles.timelineContainer}>
					<Text style={styles.timelineText}>Current: {this._toTime(this.state.time_current)}</Text>
					<Button 
						title="Check"
						onPress={() => console.log(
							this.state.soundObject.positionMillis
						)}
					/>
					<Text style={styles.timelineText}>Length: {this._toTime(this.state.time_duration)} </Text>
				</View>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3c3838',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	mediaContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	buttonContainer: {
		width: 80,
		height: 80,
		padding: 10,
		borderRadius: 40,
		backgroundColor: '#888',
		alignItems: 'center',
		justifyContent: 'center',
	},
	timelineContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		backgroundColor: '#444',
		borderRadius: 5,
	},
	timelineText: {
		color: '#fff',
	}
});
