import * as React from 'react';


interface FormData {
    repo: string;
    token: string;
}

interface AppState {
    form_data: FormData;
}

export interface LoginProps {
    onLogin: (repo: string, token: string) => void;
}

export default class Login extends React.Component<LoginProps, AppState> {

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            form_data: {
                repo: "",
                token: ""
            }
        };
    }

    render() {
        return (
            <div>
                <div className="text-container">
                    <input
                        placeholder="Repository (eg. facebook/react)"
                        type="text"
                        value={this.state.form_data.repo}
                        onChange={this.handleChange("repo")} />
                    <input
                        placeholder="Access Token"
                        type="text"
                        value={this.state.form_data.token}
                        onChange={this.handleChange("token")} />
                    <button onClick={this.login} type="button">Login</button>
                </div>
            </div>
        );
    }

    handleChange = <K extends keyof FormData>(param: K) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let form_data = { ...this.state.form_data };
        form_data[param] = event.target.value;
        this.setState({ form_data });
    }

    login = () => {
        this.props.onLogin(this.state.form_data.repo, this.state.form_data.token);
    }
}
