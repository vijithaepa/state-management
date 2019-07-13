
// How Thunk middleware works
const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch)
    }
    return next(action)
}

// How to combine reducers manually
const app = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

// Below two methods are the same
// 1 - ES5 way
function checker(store) {
    return function (next) {
        return function (action) {

        }
    }
}
// 2 - Es6 way
const checker = (store) => (next) => (action) => {

}

// How to generate Random ID
function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
}
