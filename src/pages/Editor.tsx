import * as React from 'react';

import GitHub from '../github';
import { EditorMode } from '../EditorMode';
import * as SimpleMDE from 'react-simplemde-editor';

import 'style-loader!css-loader!../../node_modules/react-simplemde-editor/dist/simplemde.min.css';

export interface EditorProps {
    github: GitHub;
    initPath: string;
    mode: EditorMode;

    onCancel: () => void;
}

interface EditorState {
    path: string;
    content: string;
    mode: EditorMode;
}

export default class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);

        this.state = {
            path: this.props.initPath,
            content: "",
            mode: this.props.mode
        };
    }

    render() {
        let confirm_button_label: string;

        switch (this.props.mode) {
            case EditorMode.CreatePage:
                confirm_button_label = "Create Page";
                break;
            case EditorMode.EditPage:
                confirm_button_label = "Save";
                break;
        }

        return (
            <div>
                <input type="text" placeholder="Path" value={this.state.path} onChange={this.updatePath} />
                <SimpleMDE value={this.state.content} onChange={this.updateContent} options={this.getMarkdownOptions()} />
                <button type="button" onClick={this.onCancel}>Cancel</button>
                <button type="button" onClick={this.onConfirm}>{confirm_button_label}</button>
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

    onConfirm = () => {
        this.props.github.createPage(this.state.path, this.state.content, "Create test");
    }

    onCancel = () => {
        // TODO: Check if changes were made, ask about cancellation
        this.props.onCancel();
    }
}
