import unittest

from support import run_solution


class NumbersInRectangularPattern1Test(unittest.TestCase):
    def test_case_01_x_3_y_4(self):
        """X = 3, Y = 4."""
        result = run_solution('numbers-in-rectangular-pattern-1', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 4 \n1 2 3 4 \n1 2 3 4 \n')

    def test_case_02_x_2_y_2(self):
        """X = 2, Y = 2."""
        result = run_solution('numbers-in-rectangular-pattern-1', '2\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 \n1 2 \n')


if __name__ == "__main__":
    unittest.main()
