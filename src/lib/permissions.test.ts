import { can } from "./permissions";

describe("can", () => {
  it("allows guests to view deadlines only", () => {
    expect(can("guest", "view_deadlines")).toBe(true);
    expect(can("guest", "complete_deadline")).toBe(false);
    expect(can("guest", "add_deadline")).toBe(false);
    expect(can("guest", "delete_deadline")).toBe(false);
  });

  it("allows users to complete deadlines but not manage them", () => {
    expect(can("user", "view_deadlines")).toBe(true);
    expect(can("user", "complete_deadline")).toBe(true);
    expect(can("user", "add_deadline")).toBe(false);
    expect(can("user", "delete_deadline")).toBe(false);
  });

  it("allows admins to perform every action", () => {
    expect(can("admin", "view_deadlines")).toBe(true);
    expect(can("admin", "complete_deadline")).toBe(true);
    expect(can("admin", "add_deadline")).toBe(true);
    expect(can("admin", "delete_deadline")).toBe(true);
  });
});
