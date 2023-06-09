import { getCustomerBashback, validateType } from '../../utils/index.js';
import { validateIfCustomerExists } from '../CustomerValidations/index.js';

export function validateOnCreateOrder(customerId, amount) {
  if (!customerId || !amount)
    throw {
      status: 400,
      message: 'All fields are required',
    };

  validateIfCustomerExists(customerId);

  const customerBashback = getCustomerBashback(customerId);

  if (customerBashback > amount)
    throw {
      status: 404,
      message: 'Amount precisa ser maior que o cashback do cliente',
      cashback: customerBashback,
    };

  if (amount <= 0)
    throw {
      status: 422,
      message: 'Amount must be greater than zero',
    };

  validateType(customerId, 'number');
  validateType(amount, 'number');
}