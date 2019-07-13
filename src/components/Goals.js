import React from 'react'
import { connect } from "react-redux";
import { handleAddGoal, handleDeleteGoal } from "../actions/goals";
import List from './List'

class Goals extends React.Component {

    removeItem = (goal) => {
        this.props.dispatch(handleDeleteGoal(goal))
    }

    addItem = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAddGoal(
            this.input.value,
            () => this.input.value = ''
        ))
    }

    render() {
        return (
            <div>
                <h1>Goals list</h1>
                <input type="text"
                       placeholder="add goal"
                       ref={(input) => this.input = input}/>
                <button onClick={this.addItem}>Add Goal</button>
                <List items={this.props.goals}
                      removeItem={this.removeItem}/>
            </div>
        )
    }
}

export default connect((state) => (
    {
        goals: state.goals
    }
))(Goals)
