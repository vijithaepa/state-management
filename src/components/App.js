import React from 'react';
import {connect} from "react-redux";
import {handleReceiveData} from "../actions/share";
import ConnectedTodos from './Todos'
import ConnectedGoals from './Goals'
import './App.css';

class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleReceiveData())
    }

    render() {
        if (this.props.loading === true) {
            return <h2>Loading</h2>
        }

        return (
            <div>
                <ConnectedTodos/>
                <ConnectedGoals/>
            </div>
        )
    }
}

export default connect((state) => (
    {
        loading: state.loading
    }
))(App)
