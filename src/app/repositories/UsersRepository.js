const { v4 } = require('uuid');

const db = require('../../database');

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
  async findAll() {
    const rows = await db.query('SELECT * FROM users');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * FROM users
      WHERE email = $1
    `, [email]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, function_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, phone, function_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, function_id]);

    return row;
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
