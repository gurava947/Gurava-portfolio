import unittest

from support import run_solution


class NumbersInInvertedHollowRightAnTest(unittest.TestCase):
    def test_case_01_start_3_n_3(self):
        """start = 3, N = 3."""
        result = run_solution('numbers-in-inverted-hollow-right-an', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 4 5 \n  6 7 \n    8 \n')

    def test_case_02_start_5_n_4(self):
        """start = 5, N = 4."""
        result = run_solution('numbers-in-inverted-hollow-right-an', '5\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5 6 7 8 \n  9   10 \n    11 12 \n      13 \n')


if __name__ == "__main__":
    unittest.main()
