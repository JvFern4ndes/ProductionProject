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

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newUser = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      users.push(newUser);
      resolve(newUser);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedUser = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      users = users.map((user) => (
        user.id === id ? updatedUser : user
      ));

      resolve(updatedUser);
    });
  }
}

module.exports = new UsersRepository();
