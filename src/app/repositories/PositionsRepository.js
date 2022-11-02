const db = require('../../database');

class PositionsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM positions ORDER BY name');
    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO positions(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }
}

module.exports = new PositionsRepository();
