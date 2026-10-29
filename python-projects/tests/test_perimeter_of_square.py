import unittest

from support import run_solution


class PerimeterOfSquareTest(unittest.TestCase):
    def test_case_01_side_five(self):
        """side five."""
        result = run_solution('perimeter-of-square', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20\n')

    def test_case_02_side_nine(self):
        """side nine."""
        result = run_solution('perimeter-of-square', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '36\n')


if __name__ == "__main__":
    unittest.main()
