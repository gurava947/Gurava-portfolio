import unittest

from support import run_solution


class NumbersInRectangle2Test(unittest.TestCase):
    def test_case_01_x_3_y_4(self):
        """X = 3, Y = 4."""
        result = run_solution('numbers-in-rectangle-2', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 4 \n5 6 7 8 \n9 10 11 12 \n')

    def test_case_02_x_2_y_3(self):
        """X = 2, Y = 3."""
        result = run_solution('numbers-in-rectangle-2', '2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 \n4 5 6 \n')


if __name__ == "__main__":
    unittest.main()
