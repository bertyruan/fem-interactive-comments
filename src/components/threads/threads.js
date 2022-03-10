import React from 'react';
import {CreateComment, Comment} from './../comments/comments';
import { getParentComment, rootId } from './../helpers/helpers';
import './thread.css';

class CommentThread extends React.Component {
    constructor(props) {
        super(props);
        this.id = Math.floor(Math.random() * 10);
        //this.props.comments
        this.currentUser = this.props.currentUser;
        this.parentCallbacks = this.props.callbacks;
        this.className = this.props.className ? this.props.className : "";
        this.callbacks = {
            delete: this.parentCallbacks.delete,
            edit: this.parentCallbacks.edit,
            create: this.createComment.bind(this),
            reply: this.replyComment.bind(this),
            checkMode: this.parentCallbacks.checkMode,
            updateMode: this.parentCallbacks.updateMode
        }
    }

    isRoot(id) {
        return id === rootId;
    }

    replyComment(parentId) {
        if(!this.callbacks.checkMode(parentId, 'reply')) {
            const childId = this.parentCallbacks.reply(parentId, this.currentUser.username);
            this.callbacks.updateMode([parentId, childId], 'reply');
            return true;
        }
        return false;
    }

    createComment(id, username, content) {
        this.callbacks.updateMode(this.props.comments.modes.replyId, 'reply');
        this.parentCallbacks.create(id, username, content);
    }

    renderComment(comment, currCommentIsUsers, isReply=false) {
        if(isReply) {
            return <CreateComment 
                        key={comment.id} 
                        onReply={this.callbacks.create} 
                        id={comment.id} 
                        currentUser={this.currentUser} 
                        type={CreateComment.type.REPLY}>
                    </CreateComment>
        }
        // if(this.state.isInEditMode.includes(comment.id))
        return <Comment 
                    key={comment.id} 
                    isUsers={currCommentIsUsers} 
                    comment={comment} 
                    callbacks={this.callbacks} 
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
            />;
        </ResponseThread>);
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
    return (
        <div className="l-reply">
            <div className="l-reply--vertical-dividor"></div>
            {props.children}
            {/* <CommentThread className="m-comment-thread--response" comments={replies} currentUser={currentUser} callbacks={callbacks}></CommentThread> */}
        </div>
    );
}

export {ResponseThread, CommentThread}