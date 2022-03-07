import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './assets/data/data.json'; 
import { Attribution } from './components/attribution/attribution';
import { buildNewThread, threadData } from './components/helpers/helpers'
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
            comments: buildNewThread('dto', Data.comments)
        }
        this.callbacks = {
            delete: this.deleteComment.bind(this),
            edit: this.editComment.bind(this),
            reply: this.replyComment.bind(this),
            create: this.createComment.bind(this)
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
        const data = {...threadData, data: {user: user}};

        this.setState(prevState => ({
            comments: buildNewThread('reply', [...prevState.comments], id, data)
        }));  
        return true;
    }

    createComment(id, content, user) {
        const data = {...threadData, data:{user: user, content: content}};
 
        this.setState(prevState => ({
            comments: buildNewThread('create', [...prevState.comments], id, data)
        }));
        return true;
    }

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

//componentDidMount() {}
//componentWillUnmount() {}
