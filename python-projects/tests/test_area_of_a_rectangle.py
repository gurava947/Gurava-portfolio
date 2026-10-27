import unittest

from support import run_solution


class AreaOfARectangleTest(unittest.TestCase):
    def test_case_01_4_by_5(self):
        """4 by 5."""
        result = run_solution('area-of-a-rectangle', '4\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20\n')

    def test_case_02_3_by_7(self):
        """3 by 7."""
        result = run_solution('area-of-a-rectangle', '3\n7')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '21\n')

    def test_edge_01_negative_side(self):
        """Negative side."""
        result = run_solution('area-of-a-rectangle', '-2\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-10\n')

    def test_edge_02_zero_side(self):
        """Zero side."""
        result = run_solution('area-of-a-rectangle', '0\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
