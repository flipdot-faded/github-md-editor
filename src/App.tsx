import * as React from 'react';

import GitHub from './github';
import { Container, Grid } from './layout';


export interface AppProps { test: string; }

interface AppState {
    path: string;
    content: string;
}

export class App extends React.Component<AppProps, AppState> {

    github: GitHub;

    constructor(props: AppProps) {
        super(props);
        this.github = new GitHub(/* username */, /* accessToken */);
        this.state = {
            path: "",
            content: ""
        };
    }

    render() {
        return (
            <Container>
                <h1>{this.props.test}</h1>
                <button type="button" onClick={this.createPage}>Create Page</button>
                <div className="text-container">
                    <input type="text" placeholder="Path" value={this.state.path} onChange={this.updatePath} />
                    <div className="panel">
                        <textarea
                            className="transparent"
                            value={this.state.content}
                            placeholder="Inhalt"
                            onChange={this.updateContent}>
                        </textarea>
                    </div>
                </div>
            </Container>
        );
    }

    updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({content: event.target.value});
    }

    updatePath = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({path: event.target.value});
    }

    createPage = () => {
        this.github.createPage(this.state.path, this.state.content, "Create test");
    }
}
