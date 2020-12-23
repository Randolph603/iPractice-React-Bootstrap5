import { AuthenticationProvider } from "@microsoft/microsoft-graph-client";

export class MyAuthenticationProvider implements AuthenticationProvider {
    private token = '';
    constructor(props: { token: string }) {
        this.token = props.token;
    }

    /**
     * This method will get called before every request to the msgraph server
     * This should return a Promise that resolves to an accessToken (in case of success) or rejects with error (in case of failure)
     * Basically this method will contain the implementation for getting and refreshing accessTokens
     */
    public async getAccessToken(): Promise<string> {
        return this.token;
    }
}