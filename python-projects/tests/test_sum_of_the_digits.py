import unittest

from support import run_solution


class SumOfTheDigitsTest(unittest.TestCase):
    def test_case_01_123(self):
        """123."""
        result = run_solution('sum-of-the-digits', '123')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')

    def test_case_02_907(self):
        """907."""
        result = run_solution('sum-of-the-digits', '907')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '16\n')

    def test_edge_01_000(self):
        """000."""
        result = run_solution('sum-of-the-digits', '000')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_edge_02_two_digits(self):
        """Two digits."""
        result = run_solution('sum-of-the-digits', '12')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
