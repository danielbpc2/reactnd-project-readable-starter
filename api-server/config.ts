const port = process.env.PORT || 3001;
const origin = process.env.ORIGIN || `http://localhost:${exports.port}`;

export {
  port, origin
}
