import React from 'react';
import './comments.css';
import {CommentCard, CommentDetails, LikabilityButton, ProfileImage, TextAreaReply} from './comments-helpers';
import { ButtonActionableType, ActionableButton, PostButton, ButtonPostType } from './../buttons/buttons';


class CreateComment extends React.Component {
    static type = {
        CREATE: 'create',
        REPLY: 'reply' 
    }

    constructor(props) {
        super(props);
        this.userImageName = props.currentUser.username;
        this.defaultText = "";
        this.buttonType = "";
        this.className = "";
        this.setType(props.type);
    }

    setType(type) {
        if(type === CreateComment.type.CREATE) {
            this.defaultText = "Add a comment...";
            this.className = "m-comment--create";
            this.buttonType = ButtonPostType.SEND;
        } else {
            this.className = "m-comment--reply";
            this.buttonType = ButtonPostType.REPLY;
        }
    }

    render() {
        return (
            <CommentCard className={`l-comment ${this.className}`}>
                <TextAreaReply value={this.defaultText}></TextAreaReply>
                <div className="l-create-comment">
                    <ProfileImage className="l-create-comment__image" imageName={this.userImageName}></ProfileImage>
                    <PostButton type={this.buttonType}></PostButton>
                </div>
            </CommentCard>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.comment = props.comment;
        this.isCurrUsers = props.isUsers;
        this.callbacks = props.callbacks;
    }
    
    getActionableButtons(isCurrUsers) {
        if(isCurrUsers) {
            const del = ButtonActionableType.DELETE;
            const edit = ButtonActionableType.EDIT;
            return (
                <div className="l-comment--actionables">
                    <ActionableButton type={del} comment={this.comment} onClick={this.callbacks.delete}/>
                    <ActionableButton type={edit} comment={this.comment} onClick={this.callbacks.edit} />
                </div>
            );
        }
        return <ActionableButton type={ButtonActionableType.REPLY} comment={this.comment} onClick={this.callbacks.reply} />;
    }

    getContent(replyingTo) {
        let c_replyingTo;
        if(replyingTo) {
            c_replyingTo = <span className="m-comment--replying-to">{`@${replyingTo} `}</span>;
        }
        return (
            <div className="comment-text l-comment--text">
                {c_replyingTo && c_replyingTo}
                { this.comment.content }
            </div>
        )
    }

    render() {
        return (
            <CommentCard className='l-comment'>
                <CommentDetails 
                    username={this.comment.user.username} 
                    isCurrUsers={this.isCurrUsers} 
                    timeSpan={this.comment.createdAt} 
                />
                {this.getContent(this.comment.replyingTo)}
                <div className="m-comment--actionables l-comment--actionables">
                    <LikabilityButton score={this.comment.score} />
                    {this.getActionableButtons(this.isCurrUsers)}
                </div>
            </CommentCard>
        );
    }
}

export {Comment, CreateComment}