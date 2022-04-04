import { Icons, Avatars } from '../shared/static-images';
import { getUserFriendlyDate } from './../shared/helpers'

function TextAreaReply(props) {
    return (
        <textarea 
            className="comment-response comment-text" 
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}>
        </textarea>
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
       props.likeComment(true);
    }
    const handleDislike = () => {
        props.likeComment(false);
    }
    return (
        <div className="m-likability-button">
            <button className="flex-center m-likability-button__like" onClick={handleLike} >{Icons.plus}</button>
            <div className="flex-center m-likability-button__value">{props.score}</div>
            <button className="flex-center m-likability-button__dislike" onClick={handleDislike}>{Icons.minus}</button>
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
            
            <div className="m-comment-details__timeSpan">{getUserFriendlyDate(props.timeSpan)}</div>
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

export {CommentCard, CommentDetails, LikabilityButton, ProfileImage, TextAreaReply}