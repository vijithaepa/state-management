// Library code
function createStore(reducer) {

    // 1 store
    // 2 get state
    // 3 listen to store updates
    // 4 update state

    let state
    let listeners = []

    const getState = () => state
    const subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.map(lister => lister())
    }

    return {
        getState,
        subscribe,
        dispatch
    }

}


// ======= App code =======

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const addTodoAction = (todo) => (
    {
        type: ADD_TODO,
        todo
    }
)

const removeTodoAction = (id) => (
    {
        type: REMOVE_TODO,
        id
    }
)

const toggleTodoAction = (id) => (
    {
        type: TOGGLE_TODO,
        id
    }
)
const addGoalAction = (goal) => (
    {
        type: ADD_GOAL,
        goal
    }
)

const removeGoalAction = (id) => (
    {
        type: REMOVE_GOAL,
        id
    }
)
// Reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter(t => t.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id === action.id ?
                Object.assign({}, todo, {complete: !todo.complete}) : todo)
        default:
            return state
    }
}

const goals = (state = [], action) => {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(t => t.id !== action.id)
        default:
            return state
    }
}

const app = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app)
store.subscribe(() => {
    console.log('the new state is : ', store.getState())
})

const unsubscribe = store.subscribe(() => {
    console.log('the state is changed')
})

store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false
}))

unsubscribe()

store.dispatch(addTodoAction({
    id: 1,
    name: 'Learn basic react',
    complete: true
}))

store.dispatch(addGoalAction({
    id: 0,
    name: 'goal Javascript Es6'
}))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
    id: 1,
    name: 'goal project',
}))

store.dispatch(removeTodoAction(0))

store.dispatch(removeGoalAction(0))
