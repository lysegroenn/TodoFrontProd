import React, { Component } from 'react';
import TickButton from './TickButton';
import DeleteButton from './DeleteButton';
import StyledSub from './StyledSub';


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
                        {this.props.post.items ? this.props.post.items.map((p, i) => <StyledSub _id={this.props.post._id} ind={i} sub={p} tick={this.props.toggleTick} remove={this.props.removeUserSub} />) : null}
                    </div>
                    <button onClick={e => this.props.removeUserPost(this.props.post._id)}>Remove Post</button>
            </div>
        )
    }
}

export default Post;

/*
                        {this.props.post.items ? this.props.post.items.map((p, i) => p.body ? <div className={p.ticked ? "item-div item-ticked" : "item-div"}  key={'itemdiv' + i}><div className='sub-title-div'><p>{p.body}</p></div>           
                            <div id='utils-div'>
                                <DeleteButton />
                                <TickButton className='tick-button' ticked={p.ticked} onClick={e => this.props.toggleTick(this.props.post._id, i)} />
                            </div>
                            </div>
                        : null) : null}
*/
