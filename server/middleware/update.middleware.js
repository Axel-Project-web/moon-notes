//ajv
const Ajv = require("ajv");
const ajv = new Ajv();

//schema
const schema = require("../schema/update.schema.json");

const validator = ajv.compile(schema);

function updateMiddleware(request, response, next) {
  const isValid = validator(request.body);
  if (!isValid) return response.status(400).send();
  next();
}

module.exports = { updateMiddleware };
