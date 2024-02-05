//helper
const { query } = require("../helper/query");

//uuid
const { v4: uuidv4 } = require("uuid");

async function singupController(request, response) {
  const { email, password, phone } = request.body;
  try {
    const id = uuidv4();
    const isRegistered = await query({
      query: `select id from users where email = "${email}"`,
    });
    if (isRegistered.length > 0) {
      response.status(404);
      response.statusMessage = "El usuario ya existe";
      return response.send();
    }
    await query({
      query: `insert into users(id, email, password, phone, list) values("${id}","${email}", "${password}", "${phone}", "[]")`,
    });
    response.json({
      status: 200,
      statusText: "Usuario registrado",
    });
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
}

module.exports = { singupController };
