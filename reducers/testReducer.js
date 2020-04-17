const testReducer = (state = "test", action) => {
	switch(action.type) {
		case 'TEST_PRINT':
			state = "TEST";
			return state;
		default:
			return state;
	}
};

export default testReducer;
