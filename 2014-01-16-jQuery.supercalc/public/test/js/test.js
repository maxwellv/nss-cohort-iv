/*
 * test("name of test", function() {
 *   deepEqual(actual, expected, "my test message");
 *   });
 *   */
test("containsChar", function() {
  deepEqual(containsChar("mouse", "u"), true, "the letter U should be in \"mouse\"");
  deepEqual(containsChar("mouse", "z"), false, "the letter Z should not be in \"mouse\"");
});
