const RelativTime = require('dayjs/plugin/relativeTime')
const dayjs = require('dayjs');
dayjs.extend(RelativTime);
const threadData = {content: '', user:'',  mode: {isEdit: false, isReply: false, replyId: NaN}};
const parentThread = {comments: [], id: -1 }
const rootId = -1;
const DATE_FORMAT = 'MMMM D, YYYY H:mm:s';

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
                    const mode = {...threadData.mode, isReply: true, replyId: comment.id};
                    const newComment = initComment('', data.user, replyingTo, mode);
                    if(replies) {
                        comment.replies.splice(0, 0, newComment);
                    }
                    else {
                        const commentIndex = comments.indexOf((c) => c.id === comment.id);
                        comments.splice(commentIndex, 0, newComment);
                    }
                }
                if(replies && comment.replies.length > 0) {
                    const parentThread = {comments: comments, id: comment.id};
                    const newReplies = buildNewThread(type, comment.replies, id, data, parentThread);
                    comment.replies = orderReplyComment(newReplies);
                    console.log(comment.replies);
                }
            }
            
            if(type === 'create') {
                if(comment.id === id) {
                    comment.content= data.content;
                    comment.createdAt = dayjs().format(DATE_FORMAT);
                    comment.mode.isReply = false;
                    comment.mode.replyId = NaN;
                }
                if(replies && comment.replies.length > 0) {
                    const newReplies = buildNewThread(type, comment.replies, id, data, parentThread);
                    const orderedReplies = orderReplyComment(newReplies.sort(sortComment));
                    comment.replies = orderedReplies;
                }
            }
            if(type ==='dto') {
                comment.createdAt = jsonTextToTime(comment.createdAt);
                comment.mode = {...threadData.mode};
                if(replies && comment.replies.length > 0) {
                    const newReplies = buildNewThread('dto', comment.replies);
                    comment.replies = newReplies;
                }
            }
            newComments.push(comment);
        }
    }
    // console.log(newComments);
    return newComments;
}

function initComment(content, username, replyingTo, mode={...threadData.mode}) {
    const comment = {
        id: Math.floor(Math.random() * 100000000),
        content: content,
        createdAt: dayjs().format(DATE_FORMAT),
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

function jsonTextToTime(timeText) {
    let time;
    switch(timeText) {
        case '1 month ago':
            time = dayjs().subtract(1, 'month');
            break;
        case '2 weeks ago':
            time = dayjs().subtract(2, 'weeks');
            break;
        case '1 week ago':
            time = dayjs().subtract(1, 'week');
            break;
        case '2 days ago':
            time = dayjs().subtract(2, 'days');
            break;
        default:
    }
    return time.format(DATE_FORMAT);
}

function getUserFriendlyDate(date) {
    return dayjs(date, DATE_FORMAT).fromNow();
}

function sortComment(comment1, comment2) {
    if(comment1.mode.isReply) {
        return 0;
    }

    const date1 = dayjs(comment1.createdAt, DATE_FORMAT);
    const date2 = dayjs(comment2.createdAt, DATE_FORMAT);

    if(date1.isAfter(date2)) {
        return 1;
    }

    return -1;
}

function orderReplyComment(_comments) {
    const comments = [..._comments];
    const replyIndexes = comments.reduce((areReplies, comment, index) => {
        if(comment.mode.isReply) {
            areReplies.push(index);
        }
        return areReplies;
    }, []);
    // console.log(comments, replyIndexes);
    for(let i = 0; i < replyIndexes.length; i++) {
        const index = replyIndexes[i];
        const reply = comments.splice(index, 1)[0];
        const parentIndex = comments.findIndex((comment) => comment.id === reply.mode.replyId );
        if(parentIndex === -1) {
            comments.splice(0, 0, reply);
        } else {
            comments.splice(parentIndex + 1, 0, reply);
        }
    }
    return comments;
}

export {initComment, buildNewThread, getParentComment, threadData, rootId, getUserFriendlyDate}