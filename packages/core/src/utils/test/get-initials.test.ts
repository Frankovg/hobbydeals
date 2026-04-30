import { getInitials } from "../get-initials";

describe("getInitials", () => {
  it("returns concatenated initials when both names are provided", () => {
    expect(getInitials("Franco", "Amoroso")).toBe("FA");
  });

  it("returns a single initial when only first name is provided", () => {
    expect(getInitials("Franco")).toBe("F");
  });

  it("returns a single initial when only last name is provided", () => {
    expect(getInitials(undefined, "Amoroso")).toBe("A");
  });

  it("returns an empty string when neither is provided", () => {
    expect(getInitials()).toBe("");
  });

  it("returns an empty string when both arguments are empty strings", () => {
    expect(getInitials("", "")).toBe("");
  });

  it("uppercases lowercase input", () => {
    expect(getInitials("franco", "amoroso")).toBe("FA");
  });

  it("trims surrounding whitespace before extracting the initial", () => {
    expect(getInitials("  Franco  ", "  Amoroso  ")).toBe("FA");
  });

  it("ignores whitespace-only arguments", () => {
    expect(getInitials("   ", "Amoroso")).toBe("A");
  });

  it("preserves diacritics", () => {
    expect(getInitials("Álvaro", "Núñez")).toBe("ÁN");
  });
});
