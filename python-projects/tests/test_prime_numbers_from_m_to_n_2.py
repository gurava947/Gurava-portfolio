import unittest

from support import run_solution


class PrimeNumbersFromMToN2Test(unittest.TestCase):
    def test_case_01_m_10_n_30(self):
        """M = 10, N = 30."""
        result = run_solution('prime-numbers-from-m-to-n-2', '10\n30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '11 13 17 19 23 29\n')

    def test_case_02_m_20_n_22(self):
        """M = 20, N = 22."""
        result = run_solution('prime-numbers-from-m-to-n-2', '20\n22\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No Prime Numbers Found\n')


if __name__ == "__main__":
    unittest.main()
