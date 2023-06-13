// Salva os dados independente do lugar: (banco de dados, arquivo, in memory, etc)

// https://nodejs.org/api/crypto.html#crypto
const { randomUUID } = require('node:crypto');

let orders = [];

class OrderRepository {
  create(customerIndex, customers, data) {
    const order = {
      _id: randomUUID(), // "RFC 4122" / "UUID v4"
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    customers[customerIndex].cashback = data.cashbackByOrder;
    customers[customerIndex].updatedAt = new Date();

    orders.push(order);

    return order;
  }

  findAll() {
    return orders;
  }

  findOne(id) {
    return orders.find(order => order._id === id);
  }
}

module.exports = OrderRepository;