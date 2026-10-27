import unittest

from support import run_solution


class AreaAndPerimeterOfSquareTest(unittest.TestCase):
    def test_case_01_5(self):
        """5."""
        result = run_solution('area-and-perimeter-of-square', '5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Area of the square is: 25\nPerimeter of the square is: 20\n')

    def test_case_02_3(self):
        """3."""
        result = run_solution('area-and-perimeter-of-square', '3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Area of the square is: 9\nPerimeter of the square is: 12\n')

    def test_edge_01_zero(self):
        """Zero."""
        result = run_solution('area-and-perimeter-of-square', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Area of the square is: 0\nPerimeter of the square is: 0\n')

    def test_edge_02_negative(self):
        """Negative."""
        result = run_solution('area-and-perimeter-of-square', '-2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Area of the square is: 4\nPerimeter of the square is: -8\n')


if __name__ == "__main__":
    unittest.main()
