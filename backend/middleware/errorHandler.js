export function notFoundHandler(_request, response) {
  response.status(404).json({ error: { code: "NOT_FOUND", message: "API route not found." } });
}

export function errorHandler(error, _request, response, _next) {
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status <= 599
    ? error.status
    : error.type === "entity.too.large" ? 413 : 500;
  // A guard that means to answer 401/403/429 says so; only an unclassified failure gets the generic
  // REQUEST_ERROR, so a rejected write is not mistaken for a malformed one by whoever is debugging it.
  const code = status >= 500
    ? "INTERNAL_ERROR"
    : error.code || (status === 413 ? "PAYLOAD_TOO_LARGE" : "REQUEST_ERROR");
  if (status >= 500) console.error("API request failed.", error);
  const message = status >= 500 ? "The local API could not complete the request." : error.message;
  if (error.headers) {
    for (const [name, value] of Object.entries(error.headers)) response.setHeader(name, value);
  }
  response.status(status).json({ error: { code, message } });
}
