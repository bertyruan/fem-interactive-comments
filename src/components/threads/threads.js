import React from 'react';
import {CreateComment, Comment} from './../comments/comments';
import './thread.css';

class CommentThread extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = this.props.currentUser;
        this.parentCallbacks = this.props.callbacks;
        this.className = this.props.className ? this.props.className : "";
        this.callbacks = {
            delete: this.parentCallbacks.delete,
            edit: this.parentCallbacks.edit,
            update: this.parentCallbacks.update,
            submitReply: this.submitReply.bind(this),
            reply: this.replyComment.bind(this),
            updateMode: this.parentCallbacks.updateMode
        }
    }

    replyComment(parentId) {
        if(!this.props.modes.reply.includes(parentId)) {
            this.parentCallbacks.reply(parentId, this.currentUser.username);
            this.callbacks.updateMode(parentId, 'reply');
            return true;
        }
        return false;
    }

    submitReply(id, parentId, username, content) {
        this.callbacks.updateMode(parentId, 'reply');
        this.parentCallbacks.submitReply(id, username, content);
    }

    renderComment(comment, currCommentIsUsers, state = {isReply: false, isEdit: false}) {
        if(state.isReply) {
            return <CreateComment 
                        key={comment.id} 
                        onReply={this.callbacks.submitReply} 
                        id={comment.id} 
                        replyId={comment.mode.replyId}
                        currentUser={this.currentUser} 
                        type={CreateComment.type.REPLY}>
                    </CreateComment>
        }

        return <Comment 
                    key={comment.id} 
                    isCurrentUser={currCommentIsUsers} 
                    comment={comment} 
                    callbacks={this.callbacks} 
                    modes={this.props.modes}
                    isEdit={state.isEdit}
                />;
    }

    renderResponseThread(comment) {
        return (
        <ResponseThread key={`${comment.id}-reply`} >
            <CommentThread 
                className="m-comment-thread--response"
                comments={comment.replies} 
                currentUser={this.currentUser} 
                callbacks={this.props.callbacks} 
                parentId={comment.id}
                modes={this.props.modes}
            />;
        </ResponseThread>);
    }

    renderComments() {
        const thread = [];
        for(let i=0; i < this.props.comments.length; i++) {
            const comment = this.props.comments[i];
            const currCommentIsUsers = comment.user.username === this.currentUser.username;
            const commentState = { isReply: comment.mode.isReply, isEdit: comment.mode.isEdit };
            const c_comment = this.renderComment(comment, currCommentIsUsers, commentState);
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
    return (
        <div className="l-reply">
            <div className="l-reply--vertical-dividor"></div>
            {props.children}
        </div>
    );
}

export {ResponseThread, CommentThread}