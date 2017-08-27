import Config from './Config';
import { EditorMode } from './EditorMode';
import { startEditor } from './index';

startEditor(document.getElementById('github-md-editor'), {
    path: '',
    mode: EditorMode.CreatePage
});
