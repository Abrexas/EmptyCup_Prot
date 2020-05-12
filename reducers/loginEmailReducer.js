const loginEmailReducer = (state = null, action) => {
	switch(action.type) {
		case 'LOGIN':
			state = "! Error: Needs Email !";
			return state;
		default:
			return state;
	}
};

export default loginEmailReducer;
