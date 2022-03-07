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
            <button className="m-likability-button__like" onClick={handleLike} >{Icons.plus}</button>
            <div className="m-likability-button__value">{props.score}</div>
            <button className="m-likability-button__dislike" onClick={handleDislike}>{Icons.minus}</button>
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
        <div className={`m-comment ${className}`}>
            {props.children}
        </div>
    );
}

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
        this.setType(props.type);
    }

    setType(type) {
        if(type === CreateComment.type.CREATE) {
            this.defaultText = "Add a comment...";
            this.buttonType = ButtonPostType.SEND;
        } else {
            this.buttonType = ButtonPostType.REPLY;
        }
    }

    render() {
        return (
            <CommentCard className="l-comment m-comment--create">
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: Data.currentUser,
            comments: Data.comments
        }
        this.callbacks = {
            delete: this.deleteComment.bind(this),
            edit: this.editComment.bind(this),
            reply: this.replyComment.bind(this)
        }
    }
    
    buildNewComments(comments, id, type, content, user) {
        let newComments = [];
        for(let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            const replies = comment.replies;

            if(type === 'delete') {
                if(comment.id !== id) {
                    if(replies && comment.replies.length > 0) {
                        let newReplies = this.buildNewComments(comment.replies, id, type);
                        comment.replies = newReplies;
                    }
                    newComments.push(comment);
                }   
            } 
            else {
                if (type === 'edit') {
                    if(comment.id === id) {
                        comment.content = content;
                    } 
                    if(replies && comment.replies.length > 0) {
                        let newReplies = this.buildNewComments(comment.replies, id, type, content, user);
                        comment.replies = newReplies;
                    }
                }
                if(type=== 'reply') {
                    if(comment.id === id) {
                        const newComment = this.newComment(content, user, id);
                        comment.replies.push(newComment);
                    }
                }
                newComments.push(comment);
            }
           
        }
        return newComments;
    }

    deleteComment(id) {
        this.setState(prevState => ({
            comments: this.buildNewComments([...prevState.comments], id, 'delete')
        }));
    }

    editComment(id, content) {
        this.setState(prevState => ({
            comments: this.buildNewComments([...prevState.comments], id, 'edit', content)
        }));        
    }

    replyComment(id, content, user) {
        this.setState(prevState => ({
            comments: this.buildNewComments([...prevState.comments], id, 'reply', content, user)
        }));
    }

    newComment(content, username, replyingToId=-1) {
        let replyingTo = "";
        if(replyingToId >= 0) {
            replyingTo = this.state.comments.find((comment) => comment.id === replyingToId).user.username;
        }
        const comment = {
            id: Math.floor(Math.random() * 100000000),
            content: content,
            createdAt: 'now',
            score: 0,
            user: {
                image: {
                    png: `./images/avatars/image-${username}.png`,
                    webp: `./images/avatars/image-${username}.webp`
                },
                username: username
            }
        }
        if(replyingTo) {
            comment.replyingTo = replyingTo;
        } else {
            comment.replies = [];
        }

        return comment;
    }

    componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return (
            <React.StrictMode>
                <main className="container">
                    <CommentThread 
                        currentUser={this.state.currentUser} 
                        comments={this.state.comments}
                        callbacks={this.callbacks} />
                    <CreateComment type={CreateComment.type.CREATE} currentUser={this.state.currentUser} />
                </main>
                <footer>
                    <Attribution />
                    <button onClick={() => {this.editComment()}}></button>
                </footer>
                {/* <CreateComment type={CreateComment.type.REPLY} currentUser={this.data.comments[0].user}></CreateComment> */}
            </React.StrictMode>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);