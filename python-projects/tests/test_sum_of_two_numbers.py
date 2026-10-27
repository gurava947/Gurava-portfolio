import unittest

from support import run_solution


class SumOfTwoNumbersTest(unittest.TestCase):
    def test_case_01_2_and_3(self):
        """2 and 3."""
        result = run_solution('sum-of-two-numbers', '2\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_02_10_and_20(self):
        """10 and 20."""
        result = run_solution('sum-of-two-numbers', '10\n20')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '30\n')

    def test_edge_01_negative_numbers(self):
        """Negative numbers."""
        result = run_solution('sum-of-two-numbers', '-4\n7')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_edge_02_zeroes(self):
        """Zeroes."""
        result = run_solution('sum-of-two-numbers', '0\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
