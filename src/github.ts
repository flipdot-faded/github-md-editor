import { Base64 } from 'js-base64';

export default class GitHub {

    repo: string;
    accessToken: string;
    auth: string;

    constructor(repo: string, accessToken: string) {
        this.repo = repo;
        this.accessToken = accessToken;

        if(accessToken) {
            this.auth = "Basic " + accessToken;
        }
    }

    defaultHeaders() : any {
        let headers: any = {};

        if(this.auth) {
            headers.Authorization = "Basic " + this.accessToken;
        }

        return headers;
    }

    createPage(path: string, content: string, commitMsg: string) {
        return fetch(`https://api.github.com/repos/${this.repo}/contents/${path}`, {
            method: 'PUT',
            headers: this.defaultHeaders(),
            body: JSON.stringify({
                message: commitMsg,
                content: Base64.encode(content)
            })
        });
    }

    updatePage(path: string, content: string, commitMsg: string, sha: string) {
        return fetch(`https://api.github.com/repos/${this.repo}}/contents/${path}`, {
            method: 'PUT',
            headers: this.defaultHeaders(),
            body: JSON.stringify({
                message: commitMsg,
                content: Base64.encode(content),
                sha: sha
            })
        });
    }

    getPage(path: string) {
        return fetch(`https://api.github.com/repos/${this.repo}/contents/${path}`, {
            method: 'GET',
            headers: this.defaultHeaders()
        }).then(res => res.json());
    }

    deletePage(path: string, commitMsg: string, sha: string) {
        return fetch(`https://api.github.com/repos/${this.repo}/contents/${path}`, {
            method: 'GET',
            headers: this.defaultHeaders(),
            body: {
                message: commitMsg,
                sha: sha
            }
        }).then(res => res.json());
    }

}
