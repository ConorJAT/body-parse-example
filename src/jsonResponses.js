// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

// {
//   name: "Conor",
//   age: 20
// }

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required!',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'addUserMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 204) {
    return respondJSONMeta(request, response, 204);
  }

  return respondJSON(request, response, 201, users[body.name]);
};

// users = {
//   'Conor': {
//     name: 'Conor',
//     age: 20
//   }
// }

module.exports = {
  getUsers,
  addUser,
};
