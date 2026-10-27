import unittest

from support import run_solution


class PerimeterOfRectangleTest(unittest.TestCase):
    def test_case_01_4_by_5(self):
        """4 by 5."""
        result = run_solution('perimeter-of-rectangle', '4\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '18\n')

    def test_case_02_10_by_2(self):
        """10 by 2."""
        result = run_solution('perimeter-of-rectangle', '10\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '24\n')

    def test_edge_01_negative_side(self):
        """Negative side."""
        result = run_solution('perimeter-of-rectangle', '-1\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8\n')

    def test_edge_02_zero_sides(self):
        """Zero sides."""
        result = run_solution('perimeter-of-rectangle', '0\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
