import unittest

from support import run_solution


class NumbersInInvertedHollowRightAngTest(unittest.TestCase):
    def test_case_01_m_3_n_3(self):
        """M = 3, N = 3."""
        result = run_solution('numbers-in-inverted-hollow-right-ang', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8 7 6 \n  5 4 \n    3 \n')

    def test_case_02_m_4_n_4(self):
        """M = 4, N = 4."""
        result = run_solution('numbers-in-inverted-hollow-right-ang', '4\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '13 12 11 10 \n  9   7 \n    6 5 \n      4 \n')


if __name__ == "__main__":
    unittest.main()
