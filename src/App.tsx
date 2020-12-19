import { CacheLocation } from "msal";
import { useEffect, useState } from 'react';
import { AccountInfo, AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';

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

function App() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [account, setAccount] = useState<AccountInfo>();
  const [objectId, setObjectId] = useState<string>('');
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
    msalInstance.loginRedirect({ scopes: ["user.read"] });
  }

  const logout = (): void => {
    if (account) {
      msalInstance.logout({ account: account });
    }
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
          <label htmlFor="bio" className="form-label">
            Access Token
          </label>
          <textarea className="form-control" id="bio" rows={15} defaultValue={accessToken}></textarea>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn btn-primary" onClick={login}>Login</button>
          <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default App;
