import unittest

from support import run_solution


class NumbersInPyramidTest(unittest.TestCase):
    def test_case_01_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('numbers-in-pyramid', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  3 \n 3 4 \n3 4 5 \n')

    def test_case_02_x_5_y_4(self):
        """X = 5, Y = 4."""
        result = run_solution('numbers-in-pyramid', '5\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   5 \n  5 6 \n 5 6 7 \n5 6 7 8 \n')


if __name__ == "__main__":
    unittest.main()
