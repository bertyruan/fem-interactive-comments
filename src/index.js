import React from 'react';
import ReactDOM from 'react-dom';
import { Icons, Avatars } from './static-images';
import { ActionableButton, PostButton, ButtonPostType } from './components/buttons/buttons';
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
        <textarea className="comment-response" value={props.value}></textarea>
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
        <div className="m-comment-info">
            <ProfileImage imageName={props.username}></ProfileImage>
            <div className="m-comment-info__username">{props.username}</div>
            <div className="m-comment-info__timeSpan">{props.timeSpan}</div>
        </div>
    )
}

function ProfileImage(props) {
    const image = Avatars[props.imageName];
    const classNames = `profile-image ${props.className}`;

    return (
        <img className={classNames} src={image} alt="profile"></img>
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

function CommentCard(props) {
    return (
        <div className="m-comment l-comment">
            {props.children}
        </div>
    );
}

class CommentThread extends React.Component {
    comments = this.props.comments;
    render() {
        return (
            <Comment comment={this.comments[0]}></Comment>
        );
    }
}

class Comment extends React.Component {

    

    getActionableButtons(type) {
        if(type === CommentStates.CREATE) {
            return;
        }
    }

    getPostButton(type) {
        if(type === CommentStates.CREATE) {
            return (
                <PostButton type={ButtonPostType.SEND}></PostButton>
            );
        }
    }

    comment = this.props.comment;

    render() {
        return (
            <CommentCard>
                <CommentDetails username={this.comment.user.username} timeSpan={this.comment.createdAt} />
                <div>{ this.comment.content }</div>
                <ActionableButton type={ButtonPostType.REPLY} />
                <LikabilityButton score={this.comment.score} />

            </CommentCard>
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
                <main class="container">
                    <CommentThread comments={this.data.comments}></CommentThread>
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