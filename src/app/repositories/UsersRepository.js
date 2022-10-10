const { uuid } = require('uuidv4');

const users = [
  {
    id: uuid(),
    name: 'Mateus',
    email: 'mateus@mail.com',
    phone: '123123123',
    category_id: uuid(),
  },
];

class UsersRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(users);
    });
  }
}

module.exports = new UsersRepository();
