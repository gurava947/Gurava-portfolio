import unittest

from support import run_solution


class NumbersInHollowSquare2Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('numbers-in-hollow-square-2', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4 3 2 1 \n4     1 \n4     1 \n4 3 2 1 \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('numbers-in-hollow-square-2', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 2 1 \n3   1 \n3 2 1 \n')


if __name__ == "__main__":
    unittest.main()
