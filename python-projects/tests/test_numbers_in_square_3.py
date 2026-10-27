import unittest

from support import run_solution


class NumbersInSquare3Test(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('numbers-in-square-3', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 \n4 5 6 \n7 8 9 \n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('numbers-in-square-3', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 4 \n5 6 7 8 \n9 10 11 12 \n13 14 15 16 \n')


if __name__ == "__main__":
    unittest.main()
