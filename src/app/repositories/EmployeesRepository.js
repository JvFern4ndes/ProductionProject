const db = require('../../database');

class EmployeesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM employees
      ORDER BY name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM employees
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * FROM employees
      WHERE email = $1
    `, [email]);
    return row;
  }

  async create({
    name, email, phone, position_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO employees(name, email, phone, position_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, position_id]);

    return row;
  }

  async update(id, {
    name, email, phone, position_id,
  }) {
    const [row] = await db.query(`
      UPDATE employees
      SET name = $1, email = $2, phone = $3, position_id = $4
      WHERE Id = $5
      RETURNING *
    `, [name, email, phone, position_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM employees WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new EmployeesRepository();
