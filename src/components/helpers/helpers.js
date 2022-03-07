function buildNewThread(comments, id, type, content, user) {
    let newComments = [];
    for(let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const replies = comment.replies;

        if(type === 'delete') {
            if(comment.id !== id) {
                if(replies && comment.replies.length > 0) {
                    let newReplies = buildNewThread(comment.replies, id, type);
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
                    let newReplies = buildNewThread(comment.replies, id, type, content, user);
                    comment.replies = newReplies;
                }
            }
            if(type=== 'reply') {
                if(comment.id === id) {
                    const replyingTo = comment.user.username;
                    const newComment = initComment(content, user, replyingTo);
                    comment.replies.push(newComment);
                }
            }
            newComments.push(comment);
        }
       
    }
    return newComments;
}

function initComment(content, username, replyingTo) {
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

export {initComment, buildNewThread}