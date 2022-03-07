import React from 'react';
import {CreateComment, Comment} from './../comments/comments';

class CommentThread extends React.Component {
    constructor(props) {
        super(props);
        //this.props.comments
        this.currentUser = this.props.currentUser;
        this.callbacks = this.props.callbacks;  
    }

    renderReplyComment() {
        return (
            <CreateComment type={CreateComment.REPLY} currentUser={this.currentUser}></CreateComment>
        );
    }

    renderComment(comment, currCommentIsUsers) {
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
            const c_comment = this.renderComment(comment, currCommentIsUsers);
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
            <div className="l-comment-thread">
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
            <CommentThread comments={replies} currentUser={currentUser} callbacks={callbacks}></CommentThread>
        </div>
    );
}

export {ResponseThread, CommentThread}