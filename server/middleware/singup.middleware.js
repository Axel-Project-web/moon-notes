//ajv
const Ajv = require("ajv");
const ajv = new Ajv();

//schema
const schema = require("../schema/singup.schema.json");

const validator = ajv.compile(schema);

function singupMiddleware(request, response, next) {
  const { email, password, phone } = request.body;
  const isValid = validator({ email, password, phone });
  if (!isValid) return response.status(400).send();
  next();
}

module.exports = { singupMiddleware };
