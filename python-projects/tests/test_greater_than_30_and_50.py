import unittest

from support import run_solution


class GreaterThan30And50Test(unittest.TestCase):
    def test_case_01_x_40(self):
        """X = 40."""
        result = run_solution('greater-than-30-and-50', '40\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'X is Greater than 30\n')

    def test_case_02_x_25(self):
        """X = 25."""
        result = run_solution('greater-than-30-and-50', '25\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'X is Greater than 30\nX is Greater than 50\n')

    def test_case_03_x_60(self):
        """X = 60."""
        result = run_solution('greater-than-30-and-50', '60\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'X is Greater than 30\nX is Greater than 50\n')

    def test_case_04_x_30(self):
        """X = 30."""
        result = run_solution('greater-than-30-and-50', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'X is Greater than 30\nX is Greater than 50\n')


if __name__ == "__main__":
    unittest.main()
