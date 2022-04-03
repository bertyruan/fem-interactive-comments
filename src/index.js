import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './assets/data/data.json'; 
import { Attribution } from './components/attribution/attribution';
import { buildNewThread, threadData, rootId, initComment, likeComment } from './components/helpers/helpers'
import { CommentThread} from './components/threads/threads'
import { CreateComment } from './components/comments/comments';

const CommentStates = {
    DEFAULT: 'default',
    EDIT: 'edit',
    REPLY: 'reply',
    CREATE: 'create'
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: Data.currentUser,
            comments: buildNewThread('dto', Data.comments),
            modes: {
                edit: [], //[parentId, childId] tuples
                reply: []
            }
        }
        this.callbacks = {
            delete: this.deleteComment.bind(this),
            edit: this.editComment.bind(this),
            update: this.updateComment.bind(this),
            reply: this.replyComment.bind(this),
            submitReply: this.submitReply.bind(this),
            updateMode: this.updateMode.bind(this),
            likeComment: this.likeComment.bind(this)
        }
    }

    updateMode(id, type) {
        if(type === 'edit') {
            this.setState(prevState => {
                let editModes = [...prevState.modes.edit];
                if(this.state.modes.edit.includes(id)) {
                    editModes = editModes.filter(modeId => modeId !== id);
                } else {
                    editModes.push(id);
                }
                return {
                    modes: {
                        reply: prevState.modes.reply,
                        edit: editModes
                    }
                }
            })
        }
        if(type === 'reply') {
            this.setState(prevState => { 
                let replyModes =  [...prevState.modes.reply];
                if(this.state.modes.reply.includes(id)) {
                    replyModes = replyModes.filter((modeId) => modeId !== id);
                } else {
                    replyModes =  replyModes.concat(id);
                }
                return {
                    modes: {
                        reply: replyModes,
                        edit: prevState.modes.edit
                    }
                }
            });
        }
    }
    
    deleteComment(id) {
        this.setState(prevState => ({
            comments: buildNewThread('delete', [...prevState.comments], id)
        }));
        return true;
    }
  
    editComment(id) {
        const data = {...threadData};
        
        this.setState(prevState => ({
            comments: buildNewThread('edit', [...prevState.comments], id, data)
        }));        
        return true;
    }

    updateComment(id, content) {
        const data = {...threadData, content: content};
        
        this.setState(prevState => ({
            comments: buildNewThread('update', [...prevState.comments], id, data)
        }));        
        return true;
    }

    replyComment(id, user) {
        const data = {...threadData, user: user};

        this.setState(prevState => ({
            comments: buildNewThread('reply', [...prevState.comments], id, data)
        }));  
        return true;
    }

    submitReply(id, user, content) {
        const data = {...threadData, user: user, content: content};
        this.setState(prevState => ({
            comments: buildNewThread('submit-reply', [...prevState.comments], id, data)
        }));
        return true;
    }

    addComment(user, content) {
        const comment = initComment(content, user);
        this.setState(prevState => {
            const newComments = [...prevState.comments];
            newComments.push(comment);
            return {
                comments: newComments
            }
        });
    }

    likeComment(id, likes) {
        const data = {...threadData, like: likes}
        this.setState(prevState => ({
            comments: buildNewThread('like', [...prevState.comments], id, data)
        }));
        return true;
    }

    render() {
        return (
            <div>
                {this.state.test}
                <main className="container">
                    <CommentThread 
                        currentUser={this.state.currentUser} 
                        comments={this.state.comments}
                        callbacks={this.callbacks}
                        modes={this.state.modes}
                        parentId={rootId}
                        />
                    <CreateComment 
                        type={CreateComment.type.CREATE} 
                        currentUser={this.state.currentUser} 
                        onCreate={this.addComment.bind(this)}
                        />
                </main>
                <footer>
                    <Attribution />
                    <button onClick={() => {this.editComment()}}></button>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

//componentDidMount() {}
//componentWillUnmount() {}
