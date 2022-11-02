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
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM users
      ORDER BY name ${direction}
    `);
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

  async update(id, {
    name, email, phone, function_id,
  }) {
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, phone = $3, function_id = $4
      WHERE Id = $5
      RETURNING *
    `, [name, email, phone, function_id, id]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      resolve();
    });
  }
}

module.exports = new UsersRepository();
