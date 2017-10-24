import * as React from 'react';

import GitHub from './github';
import { EditorMode } from './EditorMode';

import Login from './pages/Login';
import Editor from './pages/Editor';


interface AppProps {
    mode: EditorMode;
    initPath: string;
}

interface FormData {
    repo: string;
    token: string;
}

interface AppState {
    loggedIn: boolean,
    form_data: FormData;
}

export class Settings {
    repo: string;
    token: string;

    save() {
        localStorage.setItem("github-md-editor-settings", JSON.stringify(this));
    }

    static load(): Settings {
        let data = JSON.parse(localStorage.getItem("github-md-editor-settings"));

        if (data !== null) {
            return Object.assign(new Settings(), data);
        }
        return data;
    }
}

export class App extends React.Component<AppProps, AppState> {

    github: GitHub;
    settings: Settings;

    constructor(props: AppProps) {
        super(props);

        let loggedIn = false;

        this.settings = Settings.load();

        if (this.settings == null) {
            this.settings = new Settings();
        } else {
            let { repo, token } = this.settings;
            this.github = new GitHub(repo, token);
            loggedIn = true;
        }

        this.state = {
            form_data: {
                repo: "",
                token: ""
            },
            loggedIn: loggedIn
        };
    }

    render() {
        let page: React.ReactNode;

        if (this.state.loggedIn) {
            page = <Editor github={this.github} initPath={this.props.initPath} mode={this.props.mode} onCancel={this.onEditCancel} />;
        } else {
            page = <Login onLogin={this.onLogin} />;
        }

        return (
            <div className="github-md-editor">
                {page}
            </div>
        );
    }

    onLogin = (repo: string, token: string) => {
        this.github = new GitHub(repo, token);

        this.settings.repo = repo;
        this.settings.token = token;
        this.settings.save();

        this.setState({ loggedIn: true });
    }

    onEditCancel = () => { }
}
