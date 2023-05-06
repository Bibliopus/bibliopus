import type { NitroErrorHandler } from 'nitropack';

export default <NitroErrorHandler> function (error, event) {
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');
  event.node.res.setHeader('Content-Type', 'application/json');
  event.node.res.statusCode = error.statusCode || 500;
  event.node.res.end(JSON.stringify({
    message: error.message,
    code: error.statusCode,
  }));
};
