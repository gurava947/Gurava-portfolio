import unittest

from support import run_solution


class SumOfNTermsInHarmonicSeriesTest(unittest.TestCase):
    def test_case_01_5(self):
        """N = 5."""
        result = run_solution('sum-of-n-terms-in-harmonic-series', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2.28\n')

    def test_case_02_1(self):
        """N = 1."""
        result = run_solution('sum-of-n-terms-in-harmonic-series', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.0\n')


if __name__ == "__main__":
    unittest.main()
