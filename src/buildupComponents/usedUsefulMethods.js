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

// Implementations of ReactRedux.Provider, ReactRedux.connect
//Provider makes it possible for Redux to pass data from the store to any React components that need it. It uses React’s context feature to make this work.
//
// connect() connects a React component to the Redux store. The mapStateToProps() function allows us to specify which state from the store you want passed to
// your React component, while the mapDispatchToProps() function allows us to bind dispatch to action creators before they ever hit the component.
const Context = React.createContext();

function connect(mapStateToProps) {
    return (Component) => {

        class Receiver extends React.Component {
            componentDidMount() {
                const {subscribe} = this.props.store

                this.unsubscribe = subscribe(() => {
                    this.forceUpdate()
                })
            }

            componentWillUnmount() {
                this.unsubscribe()
            }

            render() {
                const {dispatch, getState} = this.props.store
                const state = getState()
                const stateNeeded = mapStateToProps(state)
                return <Component {...stateNeeded} dispatch={dispatch}/>
            }
        }

        class ConnectedComponent extends React.Component {
            render() {
                return (
                    <Context.Consumer>
                        {(store) => <Receiver store={store}/>}
                    </Context.Consumer>
                )
            }
        }

        return ConnectedComponent
    }
}

class Provider extends React.Component {

    render() {
        return (
            <Context.Provider value={this.props.store}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
