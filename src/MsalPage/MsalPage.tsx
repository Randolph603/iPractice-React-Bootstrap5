import { CacheLocation, UserAgentApplication } from "msal";
import { useEffect, useState } from 'react';
import { AccountInfo, AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { Client, ClientOptions, ImplicitMSALAuthenticationProvider, MSALAuthenticationProviderOptions } from "@microsoft/microsoft-graph-client";
import { MyAuthenticationProvider } from "./MyAuthenticationProvider";

// https://docs.microsoft.com/en-us/graph/tutorials/react?tutorial-step=3
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/FAQ.md
// https://www.npmjs.com/package/@azure/msal-browser  MSAL.js 2.X
// https://www.npmjs.com/package/msal                 MSAL.js 1.X
// adsl.js vs msal.js
// https://www.npmjs.com/package/@microsoft/microsoft-graph-client
// https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-auth-code


// const request = { scopes: ["Mail.Read"] } as SilentRequest;
// msalInstance.acquireTokenSilent(request).then(tokenResponse => {
//   console.log(tokenResponse);
// }).catch(error => {
//   if (error instanceof InteractionRequiredAuthError) {
//     // fallback to interaction when silent call fails
//     return msalInstance.acquireTokenRedirect(request)
//   }
// });

export default function MsalPage() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [account, setAccount] = useState<AccountInfo>();
  const [objectId, setObjectId] = useState<string>('');
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>('');
  const azureTenantId = 'f817034e-611f-4d4f-b067-5a8c47f462cf';
  const msalConfig = {
    auth: {
      authority: `https://login.microsoftonline.com/${azureTenantId}`,
      clientId: "4f345141-18fe-40f7-8517-7fde59884db6",
      postLogoutRedirectUri: window.location.origin,
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: ('localStorage' as CacheLocation),
      storeAuthStateInCookie: false
    },
  };
  const msalInstance = new PublicClientApplication(msalConfig);
  const msalApplication = new UserAgentApplication(msalConfig);
  const graphScopes = ["user.read", "mail.send"];
  const options = new MSALAuthenticationProviderOptions(graphScopes);
  const authProvider = new ImplicitMSALAuthenticationProvider(msalApplication, options);

  const clientOptions = {
    authProvider, // An instance created from previous step
    // authProvider: new MyAuthenticationProvider({ token: accessToken }),
  };
  const client = Client.initWithMiddleware(clientOptions);

  const handleAuthenticationResponse = (response: AuthenticationResult | null) => {
    console.log(response);
    if (response !== null) {
      setAccessToken(response.accessToken);
      setObjectId(response.uniqueId);


      if (response.account) {
        setAccount(response.account);
      }
    }
    // if (tokenResponse === null) {
    //   msalInstance.loginRedirect({ scopes: ["user.read"] });
    // }
  }

  useEffect(() => {
    msalInstance.handleRedirectPromise()
      .then(handleAuthenticationResponse)
      .catch(() => {
        // handle error, either in the library or coming back from the server
      });
  });

  const login = (): void => {
    msalInstance.loginRedirect({ scopes: ["user.read", "mail.send"] });
  }

  const logout = (): void => {
    if (account) {
      msalInstance.logout({ account: account });
    }
  }

  const getAvatar = async (): Promise<void> => {

    const response = await client.api("/me/photo/$value").version('beta').get();


    const buffer = await response.arrayBuffer();
    const base64Flag = 'data:image/jpeg;base64,';
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    }
    const imageString = arrayBufferToBase64(buffer);
    const userAvatarUrl = base64Flag + imageString;
    setUserAvatarUrl(userAvatarUrl);
  }

  const sendEmail = async (): Promise<void> => {
    const sendMail = {
      message: {
        subject: "Meet for lunch?1",
        body: {
          contentType: "Text",
          content: "The new cafeteria is open."
        },
        toRecipients: [
          {
            emailAddress: {
              address: "cliu603@gmail.com"
            }
          }
        ]
      },
      saveToSentItems: "false"
    };

    await client.api('/me/sendMail').post(sendMail);
    // await client.api('/me/messages').get();
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">Microsoft  Authentication (MSAL.js) 2.0</h2>
      <div>
        <div className="mb-3">
          <label htmlFor="oid" className="form-label">Object Id</label>
          <input type='text' className="form-control" id="oid" placeholder="oid" defaultValue={objectId} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">User Name</label>
          <input type='email' className="form-control" id="email" placeholder="name@example.com" defaultValue={account?.username} />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type='text' className="form-control" id="name" placeholder="First Last" defaultValue={account?.name} />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Photo</label>
          <img src={userAvatarUrl} />
        </div>

        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Access Token
          </label>
          <textarea className="form-control" id="bio" rows={15} defaultValue={accessToken}></textarea>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn btn-primary" onClick={getAvatar}>Get Avatar</button>
          <button type="button" className="btn btn-primary" onClick={sendEmail}>Send Email</button>
          <button type="button" className="btn btn-primary" onClick={login}>Login</button>
          <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
