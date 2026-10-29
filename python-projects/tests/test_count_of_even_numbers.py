import unittest

from support import run_solution


class CountOfEvenNumbersTest(unittest.TestCase):
    def test_case_01_three_even(self):
        """three even."""
        result = run_solution('count-of-even-numbers', '1 2 3 4 6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_02_none_even(self):
        """none even."""
        result = run_solution('count-of-even-numbers', '1 3 5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
