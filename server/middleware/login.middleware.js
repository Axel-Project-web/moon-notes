//ajv
const Ajv = require("ajv");
const ajv = new Ajv();

//schema
const schema = require("../schema/login.schema.json");

const validator = ajv.compile(schema);

//middleware
function loginMiddleware(request, response, next) {
  const { email, password } = request.body;
  const isValid = validator({ email, password });
  if (!isValid) return response.status(400).send();
  next();
}

module.exports = { loginMiddleware };
