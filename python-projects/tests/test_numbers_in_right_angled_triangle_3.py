import unittest

from support import run_solution


class NumbersInRightAngledTriangle3Test(unittest.TestCase):
    def test_case_01_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('numbers-in-right-angled-triangle-3', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 \n4 5 \n6 7 8 \n')

    def test_case_02_x_1_y_4(self):
        """X = 1, Y = 4."""
        result = run_solution('numbers-in-right-angled-triangle-3', '1\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 \n2 3 \n4 5 6 \n7 8 9 10 \n')


if __name__ == "__main__":
    unittest.main()
