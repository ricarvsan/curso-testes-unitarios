import * as infractionsRepository from "../../src/infractions-repository";
import * as userRepository from "../../src/users-repository";
import { getInfractionsFrom } from "../../src/infractions-service";
import { faker } from "@faker-js/faker";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    jest
      .spyOn(userRepository, 'getUserByDocument')
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          firstName: 'Fake',
          lastName: 'Person',
          licenseId: '12345'
        }
      });

    jest
      .spyOn(userRepository, 'getUser')
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          firstName: 'Fake',
          lastName: 'Person',
          licenseId: '12345'
        }
      });

    jest
      .spyOn(infractionsRepository, 'getInfractionsFrom')
      .mockImplementationOnce((): any => {
        return [{
          id: 1,
          date: new Date().toString(),
          description: faker.company.catchPhraseDescriptor(),
          cost: 12345,
          level: 'SEVERE',
          userId: 1
        }]
      })

    const userInfractions = await getInfractionsFrom('12345');

    expect(userInfractions).toMatchObject({
      id: 1,
      firstName: 'Fake',
      lastName: 'Person',
      licenseId: '12345'
    })

    const { infractions } = userInfractions;

    expect(infractions).toHaveLength(1);
    expect(infractions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          description: expect.any(String),
          cost: expect.any(Number),
          level: expect.any(String)
        })
      ])
    )

  });

  it("should throw an error when driver license does not exists", () => {
    const usersMock = jest.spyOn(userRepository, "getUserByDocument").mockImplementation((): any => {
      return undefined;
    });

    const userInfractions = getInfractionsFrom("invalid");
    expect(usersMock).toBeCalledTimes(1);
    expect(userInfractions).rejects.toEqual({
      type: "NOT_FOUND",
      message: "Driver not found."
    });
  })
});