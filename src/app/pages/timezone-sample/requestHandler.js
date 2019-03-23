import { renderApp } from 'server/renderApp';

export function requestHandler(req, res) {
  res.send(renderApp(req, {}));
}