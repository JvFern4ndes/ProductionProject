const PositionsRepository = require('../repositories/PositionsRepository');

class PositionController {
  async index(request, response) {
    const positions = await PositionsRepository.findAll();

    response.json(positions);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const position = await PositionsRepository.create({ name });

    response.json(position);
  }
}

module.exports = new PositionController();
