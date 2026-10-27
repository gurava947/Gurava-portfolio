import unittest

from support import run_solution


class NumbersInHollowSquare3Test(unittest.TestCase):
    def test_case_01_x_3_n_3(self):
        """X = 3, N = 3."""
        result = run_solution('numbers-in-hollow-square-3', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 4 5 \n6   8 \n9 10 11 \n')

    def test_case_02_x_10_n_4(self):
        """X = 10, N = 4."""
        result = run_solution('numbers-in-hollow-square-3', '10\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10 11 12 13 \n14     17 \n18     21 \n22 23 24 25 \n')


if __name__ == "__main__":
    unittest.main()
