//helper
const { query } = require("../helper/query");

async function loginController(request, response) {
  const { email, password } = request.body;
  try {
    const result = await query({
      query: `select email, list from users where email = "${email}" and password = "${password}"`,
    });
    if (result.length === 0) {
      response.status(404);
      response.statusMessage = "Correo o clave inválido";
      response.send();
      return;
    }
    response.json(result[0]);
  } catch (error) {
    console.log(error, "ERROR AT FILE login.controller.js");
    response.status(500).send();
  }
}

module.exports = { loginController };
