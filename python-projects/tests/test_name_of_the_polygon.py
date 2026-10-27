import unittest

from support import run_solution


class NameOfThePolygonTest(unittest.TestCase):
    def test_case_01_3_sides(self):
        """3 sides."""
        result = run_solution('name-of-the-polygon', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Triangle\n')

    def test_case_02_5_sides(self):
        """5 sides."""
        result = run_solution('name-of-the-polygon', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pentagon\n')

    def test_case_03_6_sides(self):
        """6 sides."""
        result = run_solution('name-of-the-polygon', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Big Polygon\n')

    def test_case_04_2_sides(self):
        """2 sides."""
        result = run_solution('name-of-the-polygon', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not Polygon\n')


if __name__ == "__main__":
    unittest.main()
