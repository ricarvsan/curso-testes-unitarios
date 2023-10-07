import calculator from "calculator";

describe("calculator tests", () => {
  it("should sum two numbers", async () => {
    const result = calculator.sum(2, 5);

    expect(result).toBe(7)
  });

  it("should subtract two numbers", async () => {
    const result = calculator.sub(2, 5);

    expect(result).toBe(-3)
  });

  it("should multiply two numbers", async () => {
    const result = calculator.mul(2, 5);

    expect(result).toBe(10)
  });

  it("should divide two numbers", async () => {
    const result = calculator.div(10, 2);

    expect(result).toBe(5)
  });

  it("should return 0 when diving by zero", async () => {
    const result = calculator.div(10, 0);

    expect(result).toBe(0)
  });

  
})