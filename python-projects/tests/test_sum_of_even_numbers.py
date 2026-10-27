import unittest

from support import run_solution


class SumOfEvenNumbersTest(unittest.TestCase):
    def test_case_01_n_10(self):
        """N = 10."""
        result = run_solution('sum-of-even-numbers', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '30\n')

    def test_case_02_n_5(self):
        """N = 5."""
        result = run_solution('sum-of-even-numbers', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')

    def test_case_03_n_1(self):
        """N = 1."""
        result = run_solution('sum-of-even-numbers', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
