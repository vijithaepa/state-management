import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'


const addTodo = (todo) => (
    {
        type: ADD_TODO,
        todo
    }
)

const removeTodo = (id) => (
    {
        type: REMOVE_TODO,
        id
    }
)

const toggleTodo = (id) => (
    {
        type: TOGGLE_TODO,
        id
    }
)

export const handleAddTodo = (name, cb) => {
    return (dispatch) => {
        API.saveTodo(name)
            .then((todo) => {
                dispatch(addTodo(todo))
                cb()
            })
            .catch(() => {
                alert("sorry about it, try again later !!!")
            })
    }
}

export const handleDeleteTodo = (todo) => {
    return (dispatch) => {
        dispatch(removeTodo(todo.id))
        return API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodo(todo))
                alert("error on deleting todo!!!")
            })
    }
}

export const handleToggleTodo = (todo) => {
    return (dispatch) => {
        dispatch(toggleTodo(todo.id))
        return API.saveTodoToggle(todo.id)
            .catch(() => {
                dispatch(toggleTodo(todo.id))
                alert("Failed to save toggle todo")
            })
    }
}
