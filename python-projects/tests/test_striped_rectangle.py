import unittest

from support import run_solution


class StripedRectangleTest(unittest.TestCase):
    def test_case_01_x_4_y_6(self):
        """X = 4, Y = 6."""
        result = run_solution('striped-rectangle', '4\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '----\n****\n----\n****\n')

    def test_case_02_x_3_y_3(self):
        """X = 3, Y = 3."""
        result = run_solution('striped-rectangle', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '---\n***\n---\n')


if __name__ == "__main__":
    unittest.main()
