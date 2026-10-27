import unittest

from support import run_solution


class NumbersInRectangleTest(unittest.TestCase):
    def test_case_01_x_3_y_4(self):
        """X = 3, Y = 4."""
        result = run_solution('numbers-in-rectangle', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7 8 9 10 \n7 8 9 10 \n7 8 9 10 \n')

    def test_case_02_x_2_y_2(self):
        """X = 2, Y = 2."""
        result = run_solution('numbers-in-rectangle', '2\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7 8 \n7 8 \n')


if __name__ == "__main__":
    unittest.main()
