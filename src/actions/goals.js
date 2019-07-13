import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'


const addGoal = (goal) => (
    {
        type: ADD_GOAL,
        goal
    }
)

const removeGoal = (id) => (
    {
        type: REMOVE_GOAL,
        id
    }
)


export const handleAddGoal = (name, cb) => {
    return (dispatch) => {
        return API.saveGoal(name)
            .then((todo) => {
                dispatch(addGoal(todo))
                cb()
            })
            .catch(() => {
                alert("sorry about it, try again later !!!")
            })
    }
}

export const handleDeleteGoal = (goal) => {
    return (dispatch) => {
        dispatch(removeGoal(goal.id))
        return API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoal(goal))
                alert("error on deleting Goal!!!")
            })
    }
}
