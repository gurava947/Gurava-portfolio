import unittest

from support import run_solution


class PrimeNumbersFromMToNTest(unittest.TestCase):
    def test_case_01_m_10_n_20(self):
        """M = 10, N = 20."""
        result = run_solution('prime-numbers-from-m-to-n', '10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '11\n13\n17\n19\n')

    def test_case_02_m_0_n_3(self):
        """M = 0, N = 3."""
        result = run_solution('prime-numbers-from-m-to-n', '0\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n1\n2\n3\n')


if __name__ == "__main__":
    unittest.main()
