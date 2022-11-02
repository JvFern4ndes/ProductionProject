const EmployeesRepository = require('../repositories/EmployeesRepository');

class EmployeeController {
  async index(request, response) {
    const { orderBy } = request.query;
    const employees = await EmployeesRepository.findAll(orderBy);

    response.json(employees);
  }

  async show(request, response) {
    const { id } = request.params;

    const employee = await EmployeesRepository.findById(id);

    if (!employee) {
      return response.status(404).json({ error: 'Employee not found' });
    }

    response.json(employee);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const employeeExists = await EmployeesRepository.findByEmail(email);

    if (employeeExists) {
      return response.status(400).json({ error: 'This email is already in use' });
    }

    const employee = await EmployeesRepository.create({
      name, email, phone, category_id,
    });

    response.json(employee);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const employeeExists = await EmployeesRepository.findById(id);
    if (!employeeExists) {
      return response.status(404).json({ error: 'Employee not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const employeeByEmail = await EmployeesRepository.findByEmail(email);
    if (employeeByEmail && employeeByEmail.id !== id) {
      return response.status(400).json({ error: 'This email is already in use' });
    }

    const employee = await EmployeesRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(employee);
  }

  async delete(request, response) {
    const { id } = request.params;

    await EmployeesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new EmployeeController();
