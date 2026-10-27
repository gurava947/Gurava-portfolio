import unittest

from support import run_solution


class NumbersInRectangle3Test(unittest.TestCase):
    def test_case_01_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('numbers-in-rectangle-3', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9 8 7 \n6 5 4 \n3 2 1 \n')

    def test_case_02_x_2_y_4(self):
        """X = 2, Y = 4."""
        result = run_solution('numbers-in-rectangle-3', '2\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8 7 6 5 \n4 3 2 1 \n')


if __name__ == "__main__":
    unittest.main()
