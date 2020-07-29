import React, { Component } from 'react';
import TickButton from './TickButton'


class Post extends React.Component {
    constructor(props) {
        super(props);

    }

    closeUpdate() {
        this.setState({
            updating: false
        });
    }
    render() {
        return (
            <div className="post-div">
                <h1>{this.props.post.title}</h1>
                <button onClick={e => this.props.addUserSub(this.props.post._id)}>Add Sub</button>
                    <div className="items-div">
                        {this.props.post.items ? this.props.post.items.map((p, i) => p.body ? <div className={p.ticked ? "item-div-ticked" : "item-div"}  key={'itemdiv' + i}><p>{p.body}</p>           
                        <TickButton ticked={p.ticked} onClick={e => this.props.toggleTick(this.props.post._id, i)} />
                        <button className="post-btn" onClick={e => this.props.removeUserSub(this.props.post._id, i)}>Remove</button></div> : null) : null}
                    </div>
                    <button onClick={e => this.props.removeUserPost(this.props.post._id)}>Remove Post</button>
            </div>
        )
    }
}

export default Post;

/*
return (
    <div className="post-div">
        <h1>{this.props.post.title}</h1>
        <button onClick={e => this.props.addSub(this.props.post._id)}>Add Sub</button>
            <div className="items-div">
                {this.props.post.items ? this.props.post.items.map((p, i) => p.body ? <div className="item-div" key={'itemdiv' + i}><p>{p.body}</p>
                <button className="post-btn" onClick={e => this.setState({updating: true})}>Update</button>
                <button className="post-btn" onClick={e => this.props.removeSub(this.props.post._id, i)}>Remove</button></div> : null) : null}
            </div>
            <button onClick={e => this.props.removePost(this.props.post._id)}>Remove Post</button>
            {this.state.updating ? <UpdForm closeUpdate={this.closeUpdate}/> : null}
    </div>
) */