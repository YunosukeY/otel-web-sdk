import { type Caller, getCaller } from "./caller";

describe("getCaller", () => {
  it("should return a direct caller if depth is not specified.", () => {
    const tester1 = (): Caller | undefined => getCaller();

    expect(tester1()).toEqual(
      expect.objectContaining({
        line: 5,
        column: 56,
        function: "tester1",
      }),
    );
  });

  it("should return a indirect caller if depth is 1.", () => {
    const tester1 = (): Caller | undefined => getCaller(1);
    const tester2 = (): Caller | undefined => tester1();

    expect(tester2()).toEqual(
      expect.objectContaining({
        line: 18,
        column: 47,
        function: "tester2",
      }),
    );
  });
});
