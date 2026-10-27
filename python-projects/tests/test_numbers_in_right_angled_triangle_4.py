import unittest

from support import run_solution


class NumbersInRightAngledTriangle4Test(unittest.TestCase):
    def test_case_01_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('numbers-in-right-angled-triangle-4', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 4 \n5 6 7 8 \n9 10 11 12 13 14 \n')

    def test_case_02_x_1_y_2(self):
        """X = 1, Y = 2."""
        result = run_solution('numbers-in-right-angled-triangle-4', '1\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 \n3 4 5 6 \n')


if __name__ == "__main__":
    unittest.main()
