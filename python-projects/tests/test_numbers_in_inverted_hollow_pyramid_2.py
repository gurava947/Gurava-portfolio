import unittest

from support import run_solution


class NumbersInInvertedHollowPyramid2Test(unittest.TestCase):
    def test_case_01_s_3_n_4(self):
        """S = 3, N = 4."""
        result = run_solution('numbers-in-inverted-hollow-pyramid-2', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 4 5 6 \n 7   9 \n  10 11 \n   12 \n')

    def test_case_02_s_1_n_3(self):
        """S = 1, N = 3."""
        result = run_solution('numbers-in-inverted-hollow-pyramid-2', '1\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 \n 4 5 \n  6 \n')


if __name__ == "__main__":
    unittest.main()
