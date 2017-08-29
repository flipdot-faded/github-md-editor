import { EditorMode } from './EditorMode';

export default interface Config {
    mode: EditorMode;
    path?: string;
}
