import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const orderInput: OrderInput = {
      client: faker.person.fullName(),
      description: faker.commerce.productDescription()
    }

    const protocol = 'fake-protocol';
    
    const mock = jest.spyOn(orderRepository, 'create');

    mock.mockResolvedValueOnce({
        protocol,
        status: 'IN_PREPARATION'
    })

    const order = await createOrder(orderInput)

    expect(orderRepository.create).toBeCalledTimes(1);
    expect(order).toEqual({
      protocol,
      status: 'IN_PREPARATION'
    })
  });

  it("should return an order based on the protocol", async () => {
    const protocol = 'fake-protocol';

    const mock = jest.spyOn(orderRepository, 'getByProtocol');

    mock.mockResolvedValueOnce({
      protocol,
      status: 'IN_PREPARATION'
    })

    const order = await getOrderByProtocol(protocol);

    expect(orderRepository.getByProtocol).toBeCalledTimes(1);
    expect(order).toEqual({
      protocol,
      status: 'IN_PREPARATION'
    })
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    const protocol = undefined;

    const mock = jest.spyOn(orderRepository, 'getByProtocol');

    mock.mockImplementationOnce(():any => {
      return undefined;
    });

    const order = await getOrderByProtocol(protocol);

    expect(orderRepository.getByProtocol).toBeCalledTimes(1);
    expect(order).toEqual({
      protocol,
      status: 'INVALID'
    });
  });
});