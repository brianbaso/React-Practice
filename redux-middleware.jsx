import {createStore, applyMiddleware} from "redux";

// ES5
function middleware1(storeAPI) {
	return function(next) {
		return function(action) {
			// Do anything here: 
			// - Pass the action onwards with next(action)
			// - Restart the pipeline with storeAPI.dispatch(action)
			// - storeAPI.getState()
		}
	}
}

// ES6
const middleware2 = storeAPI => next => action => {
	// Do anything here
}

// Example of middleware that logs dispatched actions
const logger = storeAPI => next => action => {
	console.log('dispatching', action);
	let result = next(action)
	console.log('next state', storeAPI.getState());
	return result;
}

const middlewareEnhancer = applyMiddleware(middleware1, middleware2, logger);
const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

// redux-thunk (asynchronous middleware): dispatch a function, which is called and given dispatch and given dispatch and getState as parameters
function thunkActionCreator(someValue) {
	return (dispatch, getState) => {
		dispatch({type : "REQUEST_STARTED"});

		myAjaxLib.post("/someEndpoint", {data : someValue})
		.then(response => dispatch({type : "REQUEST_SUCCEEDED", payload : response}))
		.catch(error => dispatch({type : "REQUEST_FAILED", error : error}))
	};
}

// redux-saga: uses ES6 generators to create pausable functions, which return descriptions of async work for the middleware to execute
function* sagaActionCreator(someValue) {
	yield put({type : "REQUEST_STARTED"});

	try {
		const reponse = yield call(myAjaxLib.post, "/someEndpoint", {data : someValue});

		yield put({type : "REQUEST_SUCCEEDED", payload : response});
	}
	catch(error) {
		yield put({type : "REQUEST_FAILED", error : error});
	}
}