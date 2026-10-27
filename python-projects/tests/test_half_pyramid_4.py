import unittest

from support import run_solution


class HalfPyramid4Test(unittest.TestCase):
    def test_case_01_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('half-pyramid-4', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8 \n7 6 \n5 4 3 \n')

    def test_case_02_x_1_y_4(self):
        """X = 1, Y = 4."""
        result = run_solution('half-pyramid-4', '1\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10 \n9 8 \n7 6 5 \n4 3 2 1 \n')


if __name__ == "__main__":
    unittest.main()
