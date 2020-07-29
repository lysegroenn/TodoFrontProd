import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from '../components/App';
import { loadUser, setUser } from './localstorage';
import thunk from 'redux-thunk';

//const Host = process.env.HOST || 'http://www.lysegroenn.com'
const Host = 'http://www.lysegroenn.com'



// Test action
const test = () => (
    {
        type: 'TEST', 
        data: "hej"
    }
)

// Aciton to update store with received Posts.
const receivePosts = (data) => {
    return {
        type: 'RECEIVE_POSTS',
        posts: data
    };
};

// Action to store user object.
const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        user: user
    }
}

// Action to display spinner
const isFetching = (bool) => {
    return {
        type: 'IS_FETCHING',
        bool: bool
    }
}





// Authentication actions

const checkLoginStatus = () => {
    return (dispatch, checkLoginStatus) => {
        fetch(Host + ':5000/api/users/',{ method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' }
        })            
        .then(res => res.json())
        .then(json => {
            console.log(json)
            let user = { displayName: '', googleId: ''};
            if(json.user) {
                user = json.user;
            }
            console.log(`Storing user: ${user.displayName}`)
            dispatch(storeUser(user))
        })
        .catch(error => console.log('something went wrong with the fetch..' + error))
    }
}

const logoutUser = () => {
    return (dispatch, getState) => {
        fetch(Host + '/auth/logout', { method: 'GET', credentials: 'include' })
        .then(res => dispatch(fetchPosts()))//dispatch(storeUser({ displayName: '', googleId: '' })))
        .catch(err => console.log(`Error logging out: ${err}`))
    }
}
// Post actions

const fetchPosts = () => {
    return (dispatch, getState) => {
        dispatch(isFetching(true))
        fetch(Host + '/api/users/posts', { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(json => {
            //console.log(json)
            dispatch(receivePosts(json.posts))
            dispatch(storeUser(json.user))
            dispatch(isFetching(false))
        })
        .catch(err => console.log(err))
    }
} 

const addUserPost = (title) => {
    return (dispatch) => {
        fetch(Host + '/api/users/userPosts/',{ method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({title: title})})
         .then(res => res.json())
         .then(json => {
             //console.log(json)
             dispatch(fetchPosts())
            })
    }
}

const removeUserPost = (_id, body) => {
    return (dispatch) => {
        fetch(Host + '/api/users/userPosts/',{ method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({_id: _id, body: body})})
        .then(res => res.json())
        .then(json => {
            //console.log(json)
            dispatch(fetchPosts())
        })
    }
}

const addUserSub = (_id, body) => {
    return (dispatch) => {
        fetch(Host + '/api/users/userSub/' , { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({_id: _id, body: body})})
        .then(res => res.json())
        .then(json => {
            //console.log(json)
            dispatch(fetchPosts())
        })
    }
}

const removeUserSub = (_id, ind) => {
    return(dispatch) => {
        fetch(Host + '/api/users/userSub/' ,{ method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({_id: _id, ind: ind})})
        .then(res => res.json())
        .then(json => {
            //console.log(json)
            dispatch(fetchPosts())
        })
    }
}

const toggleTickSub = (_id, ind) => {
    return(dispatch) => {
        fetch(Host + '/api/users/tick/' ,{ method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({_id: _id, ind: ind})})
        .then(res => res.json())
        .then(json => {
            dispatch(fetchPosts())
        })
    }
}

const editBodySub = (_id, ind, body) => {
    return(dispatch) => {
        fetch(Host + '/api/users/editBody/' ,{ method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({_id: _id, ind: ind, body: body})})
        .then(res => res.json())
        .then(json => {
            console.log(json.success)
            dispatch(fetchPosts())
        })
    }
}


/* Reducer: Is passed the initial state as well as an action,
 which is an object containing a 'type' and a 'payload'. 
The action object is created by the action 'creators'. */
const reducer = (state = {posts: [], user: {displayName: '', googleId: ''}, fetchingPosts: false}, action) => {
    switch(action.type) {
        case 'RECEIVE_POSTS' :
            return {...state, posts: action.posts};
        case 'TEST' :
            return {...state, text: action.data}
        case 'STORE_USER' :
            return {...state, user: action.user}
        case 'IS_FETCHING' :
            return {...state, fetchingPosts: action.bool}
        default:
            return state; 
    };
};

/* Mapping the state properties to be accessed from the Component */
const mapState = (state) => {
    return {
        posts: state.posts,
        user: state.user,
        fetchingPosts: state.fetchingPosts
    };
};

/*/Mapping the dispatch methods to be available in the Component. 
The methods will dispatch an action which will update the state 
in the Redux Store. */
const mapDispatch = (dispatch) => {
    return {
        checkLoginStatus: () => {
            dispatch(checkLoginStatus())
        },
        logoutUser: () => {
            dispatch(logoutUser())
        },
        getUserPosts: (jwt) => {
            dispatch(getUserPosts(jwt))
        },
        addUserPost: (title) => {
            dispatch(addUserPost(title))
        },
        removeUserPost: (_id) => {
            dispatch(removeUserPost(_id))
        },
        addUserSub: (_id, body) => {
            dispatch(addUserSub(_id, body))
        },
        removeUserSub: (_id, ind) => {
            dispatch(removeUserSub(_id, ind))
        },
        toggleTickSub: (_id, ind) => {
            dispatch(toggleTickSub(_id, ind))
        },
        editBodySub: (_id, ind, body) => {
            dispatch(editBodySub(_id, ind, body))
        },
        fetchPosts: () => {
            dispatch(fetchPosts())
        }
    }
}


const store = createStore(reducer, applyMiddleware(thunk));

const Connectors = {
    App: connect(mapState, mapDispatch)(App),
    store: store
};

export default Connectors;
