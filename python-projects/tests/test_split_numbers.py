import unittest

from support import run_solution


class SplitNumbersTest(unittest.TestCase):
    def test_case_01_five_numbers(self):
        """five numbers."""
        result = run_solution('split-numbers', '1 2 3 4 5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 2, 3, 4, 5]\n')

    def test_case_02_three_numbers(self):
        """three numbers."""
        result = run_solution('split-numbers', '10 20 30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[10, 20, 30]\n')


if __name__ == "__main__":
    unittest.main()
