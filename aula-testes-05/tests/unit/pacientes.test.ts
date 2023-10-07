import { faker } from "@faker-js/faker";
import { generateProtocolForPacient } from "protocols-generator";

jest.mock('uuid', () => {
  return {
    v4: () => {
      return 'mock protocol'
    }
  }
})

describe('Protocol Generator Tests', () => {
  it('should create an protocol', async () => {
    const name = faker.person.firstName();
    const lastName = faker.person.lastName();

    const protocol = generateProtocolForPacient(name, lastName, true);

    expect(protocol).toEqual({
      priority: true,
      date: expect.any(Date),
      pacient: `${name} ${lastName}`,
      protocol: 'mock protocol'
    })
  })
})