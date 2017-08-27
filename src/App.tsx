import * as React from 'react';

import GitHub from './github';

import Login from './pages/Login';
import Editor from './pages/Editor';


interface FormData {
    repo: string;
    token: string;
}

interface AppState {
    path: string;
    content: string;
    loggedIn: boolean,
    form_data: FormData;
}

export class Settings {
    repo: string;
    token: string;

    save() {
        localStorage.setItem("github-md-editor-settings", JSON.stringify(this));
    }

    static load() : Settings {
        return JSON.parse(localStorage.getItem("github-md-editor-settings"));
    }
}

export class App extends React.Component<{}, AppState> {

    github: GitHub;
    settings: Settings;

    constructor(props: {}) {
        super(props);

        let loggedIn = false;

        this.settings = Settings.load();

        if(this.settings == null) {
            this.settings = new Settings();
        } else {
            let repo = this.settings.repo;
            let token = this.settings.token;
            if (repo && token) {
                this.github = new GitHub(repo, token);
                loggedIn = true;
            }
        }

        this.state = {
            path: "",
            content: "",
            form_data: {
                repo: "",
                token: ""
            },
            loggedIn: loggedIn
        };
    }

    render() {
        let page: React.ReactNode;

        if(this.state.loggedIn) {
            page = <Editor github={this.github} />;
        } else {
            page = <Login onLogin={this.onLogin} />;
        }

        return (
            <div>
                {page}
            </div>
        );
    }

    onLogin = (repo: string, token: string) => {
        this.github = new GitHub(repo, token);

        this.settings.repo = repo;
        this.settings.token = token;
        this.settings.save();

        this.setState({loggedIn: true});
    }
}
