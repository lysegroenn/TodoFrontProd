import React, { Component, useEffect } from 'react';
import Post from './Post';
import Header from './Header';
import TickButton from './TickButton'
import StyledPost from './StyledPost'
import './css/App.css'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchPosts()
        };

    render () {
        return (
            <div>
                <div>
                </div>
                <div id="posts-div">
                    {this.props.posts ?
                        this.props.posts.map((p, i) => <StyledPost post={p}  tick={this.props.toggleTickSub} removePost={this.props.removeUserPost} addSub={this.props.addUserSub} removeSub={this.props.removeUserSub} editSub={this.props.toggleEditSub} editBodySub={this.props.editBodySub} />)
                    : null                
                    }
                </div>
                    <button onClick={e => this.props.addUserPost("Some Title")}>Add Post</button>
            </div> 
        
        )
    }


}

//                        this.props.posts.map((p, i) => <Post post={p} ind={i} removeUserPost={this.props.removeUserPost} addUserPost={this.props.addUserPost} addUserSub={this.props.addUserSub} removeUserSub={this.props.removeUserSub} toggleTick={this.props.toggleTickSub} />)

export default App;
