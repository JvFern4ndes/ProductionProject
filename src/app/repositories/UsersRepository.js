const { v4 } = require('uuid');

let users = [
  {
    id: v4(),
    name: 'Mateus',
    email: 'mateus@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Jose',
    email: 'jose@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
];

class UsersRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(users);
    });
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.id === id),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      resolve();
    });
  }
}

module.exports = new UsersRepository();
