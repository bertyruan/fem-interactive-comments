import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import IconPlus from './assets/images/icon-plus.svg';
import IconMinus from './assets/images/icon-minus.svg';
import IconDelete from './assets/images/icon-delete.svg';
import IconEdit from './assets/images/icon-edit.svg';
import IconReply from './assets/images/icon-reply.svg';

function LikabilityButton(props) {
    return (
        <div className="m-likability-button">
            <button className="m-likability-button__like"><img src={IconPlus} alt="like"></img></button>
            <button className="m-likability-button__value">{props.likes}</button>
            <button className="m-likability-button__dislike"><img src={IconMinus} alt="dislike"></img></button>
        </div>
    );
} 

function CommentInfo(props) {
    return (
        <div>
            
        </div>
    )
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

    render() {
        return (
            <div>
                <LikabilityButton likes={10} />
            </div>
        );
    }
}


class InteractiveCommentsPage extends React.Component {
    render() {
        return (
            <main>
                <Comment />
                <Attribution />
            </main>
        );
    }
}


ReactDOM.render(
    <InteractiveCommentsPage />,
    document.getElementById('root')
);