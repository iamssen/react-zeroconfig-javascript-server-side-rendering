import { App } from 'app';
import { cookieKeys, languageCodes } from 'app/config';
import { AppContextProvider } from 'app/context';
import { syncRouteStore } from 'app/route/syncRouteStore';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

const template = ({initialState, body}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" href="favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="manifest.json" />
    
    <link rel="stylesheet" type="text/css" href="vendor.css"/>
    <link rel="stylesheet" type="text/css" href="style.css"/>
    
    <title>App</title>
  
    <base href="/"/>
    
    <script>
      window.__INITIAL_STATE__ = ${initialState.replace(/</g, '\\\u003c')};
    </script>
  </head>
  
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app">${body}</div>
  </body>
  
  <script src="vendor.js"></script>
  <script src="style.js"></script>
  <!-- And if you use css themes you need require add their js files. -->
  <script src="app.js"></script>
</html>
`;

export function renderApp(req, contentsState) {
  const locale = req.cookies[cookieKeys.locale] || req.acceptsLanguages(...languageCodes) || languageCodes[0];
  const timezone = req.cookies[cookieKeys.timezone] || 'Asia/Seoul';
  
  const initialState = {
    locale,
    ...contentsState,
  };
  
  const body = renderToString((
    <StaticRouter location={req.url} context={{}}>
      <AppContextProvider initialState={initialState}
                          currentLocale={locale}
                          currentTimezone={timezone}>
        <App routeStore={syncRouteStore}/>
      </AppContextProvider>
    </StaticRouter>
  ));
  
  return template({
    body,
    initialState: JSON.stringify(initialState),
  });
}