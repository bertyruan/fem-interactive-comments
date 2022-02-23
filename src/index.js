import React from 'react';
import ReactDOM from 'react-dom';
import { Icons, Avatars } from './static-images'
import './index.css';


let getAvatarImagePath = require.context('./assets/images/avatars/', true);

function LikabilityButton(props) {
    const handleLike = () => {
        console.log('like');
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

function ProfileImage(props) {
    return (
        <img className="" src={props.image} alt="profile"></img>
    );
}


function Attribution(props) {
    return (
        <div className="m-attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="www.github.com/bertyruan">Berty Ruan</a>.
        </div>
    );
}

class Comment extends React.Component {

    componentDidMount() {

    }
    componentWillUnmount() {}

    render() {
        const profile = {imageName: 'image-amyrobson.png', username: 'amyrobson'};
        const timeSpan = "1 month ago";
        return (
            <div>
                <CommentDetails profile={profile} timeSpan={timeSpan} />
                <LikabilityButton likes={10} />
            </div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <main>
                    <Comment />
                    <Attribution />
                </main>
            </React.StrictMode>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);