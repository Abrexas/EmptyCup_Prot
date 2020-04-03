import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
	return useLinking(containerRef, {
		prefixes: [Linking.makeUrl('/')],
		config: {
			Root: {
				path: 'root',
				screens: {
					Login: 'login',
					Register: 'register',
					Medi: 'medi',
					Player: 'player',
					Links: 'links',
					Settings: 'settings',
				},
			},
		},
	});
}
