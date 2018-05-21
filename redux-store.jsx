// APP STATE: a plain object with many keys or "slices"
{
	todos: [
		{text: "Pass foundations exam", completed: true},
		{text: "Learn Redux", completed: true}
	],
	visibilityFilter : "SHOW_COMPLETED"
}

// ACTIONS: plain objects with a "type" field
{ type: "ADD_TODO", text: "Build something great" }
{ type: "TOGGLE_TODO", index: 1 }
{ type: "SET_VISIBILITY_FILTER", filter : "SHOW_ALL" }

// ACTION CREATORS (optional but useful): fucntions that return an action
function addTodo(text) {
	return {
		type : "ADD_TODO",
		text : "Travel the world"
	}
}

// REDUCER FUNCTIONS
function visibilityReducer(state = [], action) {
	return action.type === "SET_VISIBILITY_FILTER" ? action.filter : state
}

function todosReducer(state = [], action) {
	switch (action.type) {
		case "ADD_TODO":
			// Use state.concat() to create a new array
			return state.concat([{
				text: action.text, completed: false
			}]);

		case "TOGGLE_TODO":
			// 'map()' returns a new array {...someObject} returns new object
			return state.map((todo, index) => {
				// don't change anything that isn't at the index passed in
				if (index !== action.index)
					return todo;
				// change the index passed in to opposite of completed
				return {...todo, completed: !todo.completed}
			});

		case "REMOVE_TODO":
			return state.filter((todo, index) => {
				// return a new array and leave out the index that is being removed
				return index !== action.index
			});

		default:
			return state;
	}
}

// rootReducerFunction: combines reducer functions to do work, and returns results together
// "we have a piece of state called todos, so we use our todosReducer to update,
//  we have a piece of state called visibility, so we use visibilityReducer to update"
function todoApp(state = {}, action) {
	return {
		todos: todosReducer(state.todos, action),
		visibilityReducer: visibilityReducer(state.visibilityFilter, action)
	};
}

import {combineReducers} from "redux";
// Alternate way to do this with redux's combineReducers()
const todoApp = combineReducers({
	todos : todosReducer,
	visibilityReducer : visibilityReducer
});


import {createStore} from "redux";

import rootReducerFunction from "reducers/todoApp";
import preloadedState from "./initialState";

/*
	We use createStore() to create our store object, this function is supplied by the Redux library. Our new store will have three main methods:
		1. dispatch(): update the state by using an 'action' object
		2. getState(): return the current state inside the store
		3. subscribe(): give the store a callback and everytime an action is dispatched, the callback will run
	
	UI -> Action objects -> dispatcher( -> reducer ->) state -> UI
*/
const store = createStore(rootReducerFunction, preloadedState);

console.log(store.getState());
// {todos : [...], visibilityFilter : "SHOW_COMPLETED"}

store.dispatch({ type : 'SET_VISIBILITY_FILTER', filter : 'SHOW_ALL'})
console.log(store.getState());
// {todos : [...], visibilityFilter : "SHOW_ALL"}

const stateBefore = store.getState();
// stateBefore.todos.length == 2

store.subscribe( () => {
	console.log('Action dispatched!');

	const stateAfter = store.getState();
	// stateAfter.todos.length == 3
});

store.dispatch({ type : 'ADD_TODO', text : 'Go to swimming pool' });
// new object stateAfter has a new todo


// Using Redux with React via Redux connect
import {connect} from "react-redux";
import Account from "components/Account";
// Action creator function
import {deposit} from "actions/transactions";
// Selector function helps us retrieve data from the store
import {selectLatestTransactions} from "selectors/transactions";

// Take in state and convert it to read only props 
// In this example, we mapStateToProps will generate this.state.balance and this.state.latestTransactions

// This function is called everytime the store state changes. Each field needed returns as a prop in an object for the wrapped component.
function mapStateToProps(state, ownProps) {
	return {
		balance : state.balance,
		latestTransactions : selectLatestTransactions(state, 10)
	};
}

// Dispatch redux actions from within our react component
function mapDispatchToProps(dispatch, ownProps) {
	return {
		makeDeposit : (amount) => dispatch(deposit(amount))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);