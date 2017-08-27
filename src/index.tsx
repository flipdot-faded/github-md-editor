import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Config from './Config';
import { EditorMode } from './EditorMode';

import { App } from './App';

declare global {
    interface Window {
        startEditor: (element: HTMLElement, config: Config) => void
    }
}

export function startEditor(element: HTMLElement, config: Config) {
    let mode = config.mode;
    let path = config.path || '';

    ReactDOM.render(
        <App mode={mode} initPath={path} />,
        element
    );
}

window.startEditor = startEditor;
