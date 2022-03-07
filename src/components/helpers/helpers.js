const threadData = {content: '', user:'',  mode: {isEdit: false, isReply: false}};
const parentThread = {comments: [], id: -1 }

function buildNewThread(type, comments, id, data=threadData, parent=parentThread) {
    let newComments = [];
    for(let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const replies = comment.replies;

        if(type === 'delete') {
            if(comment.id !== id) {
                if(replies && comment.replies.length > 0) {
                    const newReplies = buildNewThread(type, comment.replies, id);
                    comment.replies = newReplies;
                }
                newComments.push(comment);
            }   
        } 
        else {
            if (type === 'edit') {
                if(comment.id === id) {
                    comment.content = data.content;
                } 
                if(replies && comment.replies.length > 0) {
                    const newReplies = buildNewThread(type, comment.replies, id, data);
                    comment.replies = newReplies;
                }
            }
            if (type ==='reply') {
                if(comment.id === id) {
                    const replyingTo = comment.user.username;
                    const mode = {...threadData, isEdit: true}
                    const newComment = initComment('', data.user, replyingTo, mode);
                    if(replies) {
                        comment.replies.splice(0, 0, newComment);
                    }
                    else {
                        const commentIndex = comments.indexOf((comment) => comment.id === id);
                        comments.splice(commentIndex, 0, newComment);
                    }
                }
                if(replies && comment.replies.length > 0) {
                    const parentThread = {comments: comments, id: comment.id};
                    const newReplies = buildNewThread(type, comment.replies, id, data, parentThread);
                    comment.replies = newReplies;
                }
            }
            
            if(type=== 'create') {
                if(comment.id === id) {
                    const replyingTo = comment.user.username;
                    const newComment = initComment(data.content, data.user, replyingTo);
                    comment.replies.push(newComment);
                }
            }
            if(type==='dto') {
                comment.mode = { isEdit: false, isReply: false };
                if(replies && comment.replies.length > 0) {
                    const newReplies = buildNewThread('dto', comment.replies);
                    comment.replies = newReplies;
                }
            }
            newComments.push(comment);
        }
       
    }
    return newComments;
}

function initComment(content, username, replyingTo, mode=threadData.mode) {
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
        },
        mode: mode
    }
    if(replyingTo) {
        comment.replyingTo = replyingTo;
    } else {
        comment.replies = [];
    }

    return comment;
}

export {initComment, buildNewThread, threadData}