const threadData = {content: '', user:'',  mode: {isEdit: false, isReply: false}};
const parentThread = {comments: [], id: -1 }
const rootId = -1;

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
                    const mode = {...threadData.mode, isReply: true};
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
            
            if(type === 'create') {
                if(comment.id === id) {
                    comment.content= data.content;
                    comment.mode.isReply = false;
           
                }
                if(replies && comment.replies.length > 0) {
                    const newReplies = buildNewThread(type, comment.replies, id, data, parentThread);
                    comment.replies = newReplies;
                }
            }
            if(type ==='dto') {
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

function getParentComment(comments, id) {
    for(let i = 0; i < comments.length; i++) {
        let parent = comments[i];
        let replies = parent.replies;
        for(let j = 0; replies && j < replies.length; j++) {
            let children = parent.replies[j];
            if(children.id === id) {
                return parent;
            }
        }
    }
    return -1;
}

export {initComment, buildNewThread, getParentComment, threadData, rootId}