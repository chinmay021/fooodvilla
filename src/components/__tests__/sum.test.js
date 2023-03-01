/*
test("name of test function", function to execute)
*/

import sum from "../Sum";

test("check sum of 2 positive numbers", () => {
  expect(sum(2, 5)).toBe(7);
  expect(sum(0, 4)).toBe(4);
});
