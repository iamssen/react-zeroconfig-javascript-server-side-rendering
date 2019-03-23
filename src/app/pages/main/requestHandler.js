import { renderApp } from 'server/renderApp';

export function requestHandler(req, res) {
  res.send(renderApp(req, {
    sample: {
      testString: 'SERVER SIDE RENDERING INITIAL STATE',
    },
  }));
}