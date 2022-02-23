import React from 'react';
import ReactDOM from 'react-dom';
import { Icons, Avatars } from './static-images';
import { PostButton, ButtonPostType } from './components/buttons/buttons';
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
        <textarea value={props.text}></textarea>
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
            <button className="m-likability-button__value">{props.likes}</button>
            <button className="m-likability-button__dislike" onClick={handleDislike}><img src={Icons.minus} alt="dislike"></img></button>
        </div>
    );
} 

function CommentDetails(props) {
    console.log(props.profile.imageName);
    return (
        <div className="m-comment-info">
            <ProfileImage image={Avatars.amyrobson}></ProfileImage>
            <div className="m-comment-info__username">{props.profile.username}</div>
            <div className="m-comment-info__timeSpan">{props.timeSpan}</div>
        </div>
    )
}

class ProfileImage extends React.Component {
    getImage(name) {
        return Avatars[name];
    }

    render() {
        return (
            <img className="" src={this.getImage(this.props.imageName)} alt="profile"></img>
        );
    }
}



class Comment extends React.Component {

    componentDidMount() {

    }
    componentWillUnmount() {}

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

    render() {
        

        const profile = {imageName: 'image-amyrobson.png', username: 'amyrobson'};
        const timeSpan = "1 month ago";
        return (
            <div>
                <CommentDetails profile={profile} timeSpan={timeSpan} />
                <PostButton type={ButtonPostType.REPLY}></PostButton>
                <LikabilityButton likes={10} />

            </div>
        );
    }
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
                    <ProfileImage imageName={this.userImageName}></ProfileImage>
                    <PostButton></PostButton>
                </div>
            </CommentCard>
        );
    }
}

function CommentCard(props) {
    return (
        <div className="m-comment">
            {props.children}
        </div>
    );
}

class CommentThread extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <main class="container">
                    <CommentThread></CommentThread>
                    <CreateComment currentUser={Data.currentUser} />
                    
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