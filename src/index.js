import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './assets/data/data.json'; 
import { Attribution } from './components/attribution/attribution';
import { buildNewThread, threadData, rootId, initComment, states, toggleMode } from './components/shared/helpers'
import { CommentThread} from './components/threads/threads'
import { DraftComment } from './components/comments/comments';
import { ConfirmDeletePopup } from './components/delete-comment/delete-comment';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: Data.currentUser,
            comments: buildNewThread('dto', Data.comments),
            modes: {
                edit: [],
                reply: []
            },
            deleteModal: {
                show: false,
                id: NaN
            }
        }

        this.callbacks = {
            delete: this.promptDelete.bind(this),
            edit: this.editComment.bind(this),
            submitEdit: this.submitEdit.bind(this),
            reply: this.replyComment.bind(this),
            submitReply: this.submitReply.bind(this),
            updateMode: this.updateMode.bind(this),
            likeComment: this.likeComment.bind(this)
        }
    }

    promptDelete(id) {
        this.setState({deleteModal: {show: true, id: id}});
    }

    cancelDelete() {
        this.setState({deleteModal: {show: false, id: NaN}});
    }
    
    deleteComment() {
        const id = this.state.deleteModal.id;
        this.setState(prevState => ({
            comments: buildNewThread(states.DELETE, [...prevState.comments], id)
        }));
        this.cancelDelete();
        return true;
    }
  
    editComment(id) {
        const data = {...threadData};
        
        this.setState(prevState => ({
            comments: buildNewThread(states.EDIT, [...prevState.comments], id, data)
        }));        
        return true;
    }

    submitEdit(id, content) {
        const data = {...threadData, content: content};
        
        this.setState(prevState => ({
            comments: buildNewThread(states.SUBMIT_EDIT, [...prevState.comments], id, data)
        }));        
        return true;
    }

    replyComment(id, user) {
        const data = {...threadData, user: user};

        this.setState(prevState => ({
            comments: buildNewThread(states.REPLY, [...prevState.comments], id, data)
        }));  
        return true;
    }

    submitReply(id, user, content) {
        const data = {...threadData, user: user, content: content};
        this.setState(prevState => ({
            comments: buildNewThread(states.SUBMIT_REPLY, [...prevState.comments], id, data)
        }));
        return true;
    }

    likeComment(id, likes) {
        const data = {...threadData, like: likes}
        this.setState(prevState => ({
            comments: buildNewThread(states.LIKE, [...prevState.comments], id, data)
        }));
        return true;
    }

    updateMode(id, type) {
        this.setState(prevState => {
            let editModes = [...prevState.modes.edit];  
            let replyModes =  [...prevState.modes.reply];
            if(type === states.EDIT) {
                editModes = toggleMode(editModes, id);
            }
            if(type === states.REPLY) {
                replyModes = toggleMode(replyModes, id);
            }
            return {
                modes: {
                    reply: replyModes,
                    edit: editModes
                }
            }
        });
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

    get modalStyle() {
        return this.state.deleteModal.show && 'no-overflow';
    }

    render() {
        return (
            <div className={`root ${this.modalStyle}`}>
                <main className="container">
                    <CommentThread 
                        currentUser={this.state.currentUser} 
                        comments={this.state.comments}
                        callbacks={this.callbacks}
                        modes={this.state.modes}
                        parentId={rootId}
                        />
                    <DraftComment 
                        type={DraftComment.type.CREATE} 
                        currentUser={this.state.currentUser} 
                        onCreate={this.addComment.bind(this)}
                        />
                </main>
                <footer>
                    <Attribution />
                    <button onClick={() => {this.editComment()}}></button>
                </footer>
                <ConfirmDeletePopup
                    show={this.state.deleteModal.show}
                    cancel={this.cancelDelete.bind(this)}
                    delete={this.deleteComment.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);