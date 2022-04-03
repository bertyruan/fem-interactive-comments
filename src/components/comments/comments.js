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
        this.username = props.currentUser.username;
        this.buttonType = "";
        this.className = "";
        this.placeholderText = "";
        this.submitCallback = () => {}
        this.setType(props.type);
        this.state = { textareaValue: "" };
    }

    onChange(event) {
        this.setState({textareaValue: event.target.value});
    }

    setType(type) {
        let placeholderText, className, buttonType, submitCallback;

        if(type === CreateComment.type.CREATE) {
            placeholderText = "Add a comment...";
            className = "m-comment--create";
            buttonType = ButtonPostType.SEND;
            submitCallback = () => this.props.onCreate(this.username, this.state.textareaValue);
        } 

        if(type === CreateComment.type.REPLY) {
            className = "m-comment--reply";
            buttonType = ButtonPostType.REPLY;
            submitCallback = () => this.props.onReply(this.props.id, this.props.replyId, this.username, this.state.textareaValue);
        }
        this.className = className;
        this.buttonType = buttonType;
        this.placeholderText = placeholderText;
        this.submitCallback = submitCallback;
    }

    onSubmit() {
        this.submitCallback();
        this.setState({textareaValue: ""});
    }
    

    render() {
        return (
            <CommentCard className={`l-comment ${this.className}`}>
                <TextAreaReply value={this.state.textareaValue} onChange={this.onChange.bind(this)} placeholder={this.placeholderText}></TextAreaReply>
                <div className="l-create-comment">
                    <ProfileImage className="l-create-comment__image" imageName={this.username}></ProfileImage>
                    <PostButton 
                        onClick={this.onSubmit.bind(this)} 
                        type={this.buttonType}
                        commentId={this.props.id}>
                    </PostButton>
                </div>
            </CommentCard>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.callbacks = props.callbacks;
    }

    isButtonDisabled(id, type) {
        if(type === 'reply') {
            return this.props.modes.reply.includes(id);
        }
        if(type === "edit") {
            return this.props.modes.edit.includes(id);
        }
    }
    
    getActionableButtons(isCurrUsers) {
        if(isCurrUsers) {
            const del = ButtonActionableType.DELETE;
            const edit = ButtonActionableType.EDIT;
            return (
                <div className="l-comment--actionables">
                    <ActionableButton 
                        type={del} 
                        comment={this.props.comment}
                        onClick={this.callbacks.delete}/>
                    <ActionableButton 
                        type={edit} 
                        comment={this.props.comment}
                        disabled={this.isButtonDisabled(this.props.comment.id, 'edit')}  
                        onClick={this.callbacks.edit} />
                </div>
            );
        }
        return (
            <ActionableButton 
                type={ButtonActionableType.REPLY} 
                comment={this.props.comment} 
                disabled={this.isButtonDisabled(this.props.comment.id, 'reply')}
                onClick={this.callbacks.reply} />);
    }

    getContent(replyingTo) {
        let c_replyingTo;
        if(replyingTo) {
            c_replyingTo = <span className="m-comment--replying-to">{`@${replyingTo} `}</span>;
        }
        return (
            <div className="comment-text l-comment--text">
                {c_replyingTo && c_replyingTo}
                { this.props.comment.content }
            </div>
        )
    }

    render() {
        return (
            <CommentCard className='l-comment'>
                <CommentDetails 
                    username={this.props.comment.user.username} 
                    isCurrUsers={this.props.isCurrentUser} 
                    timeSpan={this.props.comment.createdAt} 
                />
                {this.getContent(this.props.comment.replyingTo)}
                <div className="m-comment--actionables l-comment--actionables">
                    <LikabilityButton score={this.props.comment.score} />
                    {this.getActionableButtons(this.props.isCurrentUser)}
                </div>
            </CommentCard>
        );
    }
}

export {Comment, CreateComment}