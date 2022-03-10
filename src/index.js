import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './assets/data/data.json'; 
import { Attribution } from './components/attribution/attribution';
import { buildNewThread, threadData, rootId } from './components/helpers/helpers'
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
                edit: [],
                reply: []
            }
        }
        this.callbacks = {
            delete: this.deleteComment.bind(this),
            edit: this.editComment.bind(this),
            reply: this.replyComment.bind(this),
            create: this.createComment.bind(this),
            checkMode: this.checkMode.bind(this),
            updateMode: this.updateMode.bind(this)
        }
    }

    checkMode(id, type) {
        if(type === 'edit') {

        }
        if(type === 'reply') {
            return this.state.modes.reply.includes(id);
        }
        return false;
    }

    updateMode(id, type) {
        if(type === 'edit') {

        }
        if(type === 'reply') {
            this.setState(prevState => { 
                let modes =  [...prevState.modes.reply];
                if(this.checkMode(id, type)) {
                    modes = modes.filter((modeId) => modeId !== id);
                } else {
                    modes =  modes.concat(id);
                }
                return {
                    modes: {
                        reply: modes,
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
  
    editComment(id, content) {
        const data = {...threadData, content: "blah blah black sheep"};
        
        this.setState(prevState => ({
            comments: buildNewThread('edit', [...prevState.comments], id, data)
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

    createComment(id, user, content) {
        const data = {...threadData, data:{user: user, content: content}};
 
        this.setState(prevState => ({
            comments: buildNewThread('create', [...prevState.comments], id, data)
        }));
        return true;
    }

    render() {
        return (
            <div>
                <main className="container">
                    <CommentThread 
                        currentUser={this.state.currentUser} 
                        comments={this.state.comments}
                        callbacks={this.callbacks}
                        parentId={rootId}
                        />
                    <CreateComment type={CreateComment.type.CREATE} currentUser={this.state.currentUser} />
                </main>
                <footer>
                    <Attribution />
                    <button onClick={() => {this.editComment()}}></button>
                </footer>
                {/* <CreateComment type={CreateComment.type.REPLY} currentUser={this.data.comments[0].user}></CreateComment> */}
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
