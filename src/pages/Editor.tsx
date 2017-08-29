import * as React from 'react';

import GitHub from '../github';
import * as SimpleMDE from 'react-simplemde-editor';

import 'style-loader!css-loader!../../node_modules/react-simplemde-editor/dist/simplemde.min.css';

export interface EditorProps {
    github: GitHub;
    initPath: string;
}

interface EditorState {
    path: string;
    content: string;
}

export default class Editor extends React.Component<EditorProps, EditorState> {

    constructor(props: EditorProps) {
        super(props);
        this.state = {
            path: this.props.initPath,
            content: ""
        };
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.createPage}>Create Page</button>
                <div className="text-container">
                    <input type="text" placeholder="Path" value={this.state.path} onChange={this.updatePath} />
                    <SimpleMDE value={this.state.content} onChange={this.updateContent} options={this.getMarkdownOptions()} />
                </div>
            </div>
        );
    }

    getMarkdownOptions = (): any => {
        return {
            autofocus: false,
            spellChecker: false,
            indentWithTabs: false,
            status: false
        };
    }

    updateContent = (value: string) => {
        this.setState({ content: value });
    }

    updatePath = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ path: event.target.value });
    }

    createPage = () => {
        this.props.github.createPage(this.state.path, this.state.content, "Create test");
    }
}
