import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	ScrollView,
	TouchableOpacity, 
	Slider,
	Dimensions
} from 'react-native';
import { Audio } from 'expo-av';

// Import Custom Components
import AlbumCard from '../components/player/AlbumCard';
import GoDeeper  from '../components/player/GoDeeper';

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
			goDeeper: false,
		};
	}

	componentDidMount() {
		try {
			(async() => {
				await this.state.soundObject.loadAsync(require('../assets/sounds/Menu.mp3'));
				await this.state.soundObject.setProgressUpdateIntervalAsync(1000);
				await Audio.setAudioModeAsync({
					staysActiveInBackground: true,
					interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
					shouldDuckAndroid: true,
					playThroughEarpieceAndroid: true,
					allowsRecordingIOS: true,
					interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
					playsInSilentModeIOS: true,
				});
			})();
		} catch (err) {
			console.error(err);
		}

		// Enable access to playback status
		this.state.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
	}

	componentWillUnmount(){
		if (this.state.isPlaying){
			this._kill_Audio();
		}
		console.log("Cutting Audio...")
		console.log('unmount')
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

	_onSlidingComplete(val){
		if (this.state.isPlaying){
			this.state.soundObject.playFromPositionAsync(val);
		}
		else{
			this.state.soundObject.setPositionAsync(val);
		}
	}

	// Temporary Killswitch
	_kill_Audio() { this.state.soundObject.stopAsync(); }

	_scrollTo(){
		if (this.state.goDeeper)
			this.scroll.scrollTo({x: 0, y: 0, animated: true});
		else
			this.scroll.scrollToEnd();

		this.setState(() => ({ goDeeper: !this.state.goDeeper }));
	}

	render() {		
		return (
			<View style={styles.container}>
				<ScrollView 
					ref={(scroll) => {this.scroll = scroll;}}
					scrollEnabled={false}
					contentContainerStyle={{flexGrow: 1}} 
					style={{backgroundColor: '#00f'}}
				>
					<View style={styles.scrollContainer}>
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
					<View style={styles.sliderContainer}>
						<Slider 
							minimumTrackTintColor='#c4a'
							value={this.state.time_current}
							onSlidingComplete={(val) => this._onSlidingComplete(val)} 
							maximumValue={this.state.time_duration}
						/>
					</View>
					<View style={styles.timelineContainer}>
						<Text style={styles.timelineText}>Current: {this._toTime(this.state.time_current)}</Text>
						<Text style={styles.timelineText}>Length: {this._toTime(this.state.time_duration)} </Text>
					</View>
					{/*<GoDeeper />*/}
					<TouchableOpacity 
						style={{width: '80%', height: 300, backgroundColor: '#888', marginTop: 10, borderRadius: 20}}
						onPress={() => {this._scrollTo()}}
					>
						<View style={{alignItems: 'center'}}>
							<Text style={{fontWeight: 'bold', fontSize: 20,  color: '#fff'}}>Go Deeper</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
		);
	}
}

let _height = Dimensions.get('window').height

const styles = StyleSheet.create({
	container: {
	},
	scrollContainer: {
		height: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#3c3838',
	},
	mediaContainer: {
		width: '100%',
		marginVertical: 40,
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
	sliderContainer: {
		width: '80%',
		marginBottom: 20,
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
