import unittest

from support import run_solution


class EvensAndOddsTest(unittest.TestCase):
    def test_case_01_m_1_n_10(self):
        """M = 1, N = 10."""
        result = run_solution('evens-and-odds', '1\n10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n5\n')

    def test_case_02_m_2_n_7(self):
        """M = 2, N = 7."""
        result = run_solution('evens-and-odds', '2\n7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n3\n')


if __name__ == "__main__":
    unittest.main()
