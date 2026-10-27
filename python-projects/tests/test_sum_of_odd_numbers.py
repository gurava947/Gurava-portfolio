import unittest

from support import run_solution


class SumOfOddNumbersTest(unittest.TestCase):
    def test_case_01_n_10(self):
        """N = 10."""
        result = run_solution('sum-of-odd-numbers', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '25\n')

    def test_case_02_n_6(self):
        """N = 6."""
        result = run_solution('sum-of-odd-numbers', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9\n')


if __name__ == "__main__":
    unittest.main()
