import { Icons, Avatars } from './../../static-images';

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
       
    }
    const handleDislike = () => {
   
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

export {CommentCard, CommentDetails, LikabilityButton, ProfileImage, TextAreaReply}