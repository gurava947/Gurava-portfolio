import unittest

from support import run_solution


class SumOfNTermsInTheSeries2Test(unittest.TestCase):
    def test_case_01_2_3(self):
        """X = 2, N = 3."""
        result = run_solution('sum-of-n-terms-in-the-series-2', '2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '14.0\n')

    def test_case_02_1_5_3(self):
        """X = 1.5, N = 3."""
        result = run_solution('sum-of-n-terms-in-the-series-2', '1.5\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7.125\n')


if __name__ == "__main__":
    unittest.main()
