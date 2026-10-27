import unittest

from support import run_solution


class NumbersInHollowPyramidTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('numbers-in-hollow-pyramid', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   5 \n  5 6\n 5   7\n5 6 7 8 \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('numbers-in-hollow-pyramid', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  5 \n 5 6\n5 6 7 \n')


if __name__ == "__main__":
    unittest.main()
