import unittest

from support import run_solution


class SumOfPrimeNumbersInRangeTest(unittest.TestCase):
    def test_case_01_m_10_n_20(self):
        """M = 10, N = 20."""
        result = run_solution('sum-of-prime-numbers-in-range', '10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '60\n')

    def test_case_02_m_0_n_3(self):
        """M = 0, N = 3."""
        result = run_solution('sum-of-prime-numbers-in-range', '0\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')


if __name__ == "__main__":
    unittest.main()
