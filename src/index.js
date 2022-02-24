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
    return (
        <div className="m-comment l-comment">
            {props.children}
        </div>
    );
}

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.userImageName = this.props.currentUser.username;
    }

    defaultText = "Add a comment...";
    render() {
        return (
            <CommentCard>
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
        this.comment = this.props.comment;
        this.isCurrUsers = this.props.isUsers;   
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

    getPostButton(type) {
        if(type === CommentStates.CREATE) {
            return (
                <PostButton type={ButtonPostType.SEND}></PostButton>
            );
        }
    }

    render() {
        return (
            <CommentCard>
                <CommentDetails 
                    username={this.comment.user.username} 
                    isCurrUsers={this.isCurrUsers} 
                    timeSpan={this.comment.createdAt} 
                />
                <div className="comment-text">{ this.comment.content }</div>
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

    currComment = this.comments[0];
    currCommentIsUsers = this.currComment.user.username === this.currentUser.username;

    render() {
        return (
            <Comment isUsers={this.currCommentIsUsers} comment={this.comments[0]}></Comment>
        );
    }
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