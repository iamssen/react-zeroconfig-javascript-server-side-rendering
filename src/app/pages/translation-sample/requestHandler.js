import { renderApp } from 'server/renderApp';

export function requestHandler(req, res) {
  res.send(renderApp(req, {
    sample: {
      testString: 'THIS TEXT IS FROM SERVER SIDE RENDERING INITIAL STATE',
    },
  }));
}