import co from 'co';
import test from 'blue-tape';

export function setUpTest(message, unitTest) {
  test(message, co.wrap(unitTest));
}
