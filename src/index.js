import React from 'react';
import ReactDOM from 'react-dom';
import { Icons, Avatars } from './static-images';
import { ButtonActionableType, ActionableButton, PostButton, ButtonPostType } from './components/buttons/buttons';
import './index.css';
import Data from './assets/data/data.json'; 
import { Attribution } from './components/attribution/attribution';

const CommentStates = {
    DEFAULT: 'default',
    EDIT: 'edit',
    REPLY: 'reply',
    CREATE: 'create'
}

function TextAreaReply(props) {
    return (
        <textarea className="comment-response comment-text" value={props.value}></textarea>
    );
}

function ProfileImage(props) {
    const image = Avatars[props.imageName];
    const classNames = `profile-image ${props.className}`;

    return (
        <img className={classNames} src={image} alt="profile"></img>
    );
}

function LikabilityButton(props) {
    const handleLike = () => {
        console.log('like');
        console.log(Data.currentUser);
    }
    const handleDislike = () => {
        console.log('dislike');
    }
    return (
        <div className="m-likability-button">
            <button className="m-likability-button__like" onClick={handleLike} ><img src={Icons.plus} alt="like"></img></button>
            <button className="m-likability-button__value">{props.score}</button>
            <button className="m-likability-button__dislike" onClick={handleDislike}><img src={Icons.minus} alt="dislike"></img></button>
        </div>
    );
} 

function CommentDetails(props) {
    return (
        <div className="l-comment-details">
            <ProfileImage imageName={props.username}></ProfileImage>
            <div className="m-comment-details__username">
                {props.username}
                {props.isCurrUsers && <span className="m-comment-details__you">you</span>}
            </div>
            
            <div className="m-comment-details__timeSpan">{props.timeSpan}</div>
        </div>
    )
}

function CommentCard(props) {
    const className = props.className || "";
    return (
        <div className={`m-comment l-comment ${className}`}>
            {props.children}
        </div>
    );
}

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.userImageName = props.currentUser.username;
    }

    defaultText = "Add a comment...";
    render() {
        return (
            <CommentCard className="m-comment--create">
                <TextAreaReply value={this.defaultText}></TextAreaReply>
                <div className="l-create-comment">
                    <ProfileImage className="l-create-comment__image" imageName={this.userImageName}></ProfileImage>
                    <PostButton type={ButtonPostType.SEND}></PostButton>
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
    }
    
    getActionableButtons(isCurrUsers) {
        if(isCurrUsers) {
            const del = ButtonActionableType.DELETE;
            const edit = ButtonActionableType.EDIT;
            return (
                <div className="l-comment--actionables">
                    <ActionableButton type={del} />
                    <ActionableButton type={edit} />
                </div>
            );
        }
        return <ActionableButton type={ButtonActionableType.REPLY} />;
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
            <CommentCard>
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

class CommentThread extends React.Component {
    comments = this.props.comments;
    currentUser = this.props.currentUser;

    renderComments() {
        const thread = [];
        for(let i=0; i < this.comments.length; i++) {
            const comment = this.comments[i];
            const currCommentIsUsers = comment.user.username === this.currentUser.username;
            const c_comment = <Comment key={comment.id} isUsers={currCommentIsUsers} comment={comment} />;
            thread.push(c_comment);

            if(comment.replies?.length > 0) {
                const replies = <ResponseThread key={`${comment.id}-reply`} replies={comment.replies} currentUser={this.currentUser} />;
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

    if(props.replies.length <= 0) {
        return;
    }

    return (
        <div className="l-reply">
            <div className="l-reply--vertical-dividor"></div>
            <CommentThread comments={replies} currentUser={currentUser}></CommentThread>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = Data;
    }

    componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return (
            <React.StrictMode>
                <main className="container">
                    <CommentThread 
                        currentUser={this.data.currentUser} 
                        comments={this.data.comments} />
                    <CreateComment currentUser={this.data.currentUser} />
                </main>
                <footer>
                    <Attribution />
                </footer>
            </React.StrictMode>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);