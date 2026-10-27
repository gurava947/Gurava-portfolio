import unittest

from support import run_solution


class FirstPrimeNumberFromMToNTest(unittest.TestCase):
    def test_case_01_m_10_n_30(self):
        """M = 10, N = 30."""
        result = run_solution('first-prime-number-from-m-to-n', '10\n30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '11\n')

    def test_case_02_m_20_n_22(self):
        """M = 20, N = 22."""
        result = run_solution('first-prime-number-from-m-to-n', '20\n22\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No prime numbers in the given range\n')


if __name__ == "__main__":
    unittest.main()
