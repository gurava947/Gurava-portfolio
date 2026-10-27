import unittest

from support import run_solution


class NumbersInInvertedHollowPyramidTest(unittest.TestCase):
    def test_case_01_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('numbers-in-inverted-hollow-pyramid', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 4 5 \n 3 4\n  3 \n')

    def test_case_02_x_4_y_2(self):
        """X = 4, Y = 2."""
        result = run_solution('numbers-in-inverted-hollow-pyramid', '4\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2 3 4 5 \n 2   4\n  2 3\n   2 \n')


if __name__ == "__main__":
    unittest.main()
