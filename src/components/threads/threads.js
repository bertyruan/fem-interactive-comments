import React from 'react';
import {CreateComment, Comment} from './../comments/comments';
import './thread.css';

class CommentThread extends React.Component {
    constructor(props) {
        super(props);
        //this.props.comments
        this.currentUser = this.props.currentUser;
        this.parentCallbacks = this.props.callbacks;
        this.className = this.props.className ? this.props.className : "";
        this.callbacks = {
            delete: this.parentCallbacks.delete,
            edit: this.parentCallbacks.edit,
            reply: this.replyComment.bind(this)
        }
        this.state = {
            isInEditMode: []
        }
    }

    replyComment(id) {
        if(!this.state.isInEditMode.includes(id)) {
            this.parentCallbacks.reply(id);
            this.setState(prevState => prevState.isInEditMode.push(id));
            return true;
        }
        return false;
    }

    renderComment(comment, currCommentIsUsers, isReply=false) {
        if(isReply) {
            return <CreateComment key={comment.id} currentUser={this.currentUser} type={CreateComment.type.REPLY}></CreateComment>
        }
        // if(this.state.isInEditMode.includes(comment.id))
        return <Comment key={comment.id} isUsers={currCommentIsUsers} comment={comment} callbacks={this.callbacks} />;
    }

    renderResponseThread(comment) {
        return <ResponseThread key={`${comment.id}-reply`} replies={comment.replies} currentUser={this.currentUser} callbacks={this.callbacks} />;
    }

    renderComments() {
        const thread = [];
        for(let i=0; i < this.props.comments.length; i++) {
            const comment = this.props.comments[i];
            const currCommentIsUsers = comment.user.username === this.currentUser.username;
            const c_comment = this.renderComment(comment, currCommentIsUsers, comment.mode.isReply);
            thread.push(c_comment);

            if(comment.replies?.length > 0) {
                const replies = this.renderResponseThread(comment);
                thread.push(replies);
            }
        }
        return thread;
    }

    render() {
        return (
            <div className={`l-comment-thread ${this.className}`}>
                {this.renderComments()}
            </div>
        );
    }
}

function ResponseThread(props) {
    const replies = props.replies;
    const currentUser = props.currentUser;
    const callbacks = props.callbacks;

    if(props.replies.length <= 0) {
        return;
    }

    return (
        <div className="l-reply">
            <div className="l-reply--vertical-dividor"></div>
            <CommentThread className="m-comment-thread--response" comments={replies} currentUser={currentUser} callbacks={callbacks}></CommentThread>
        </div>
    );
}

export {ResponseThread, CommentThread}