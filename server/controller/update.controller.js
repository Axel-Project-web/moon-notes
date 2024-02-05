//helper
const { query } = require("../helper/query");

async function updateController(request, response) {
  const { list, email } = request.body;
  try {
    const result = await query({
      query: `update users set list = ? where email = "${email}"`,
      params: [JSON.stringify(list)],
    });
    response.status(200);
    response.statusMessage = "User updated";
    response.send();
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
}

module.exports = { updateController };
