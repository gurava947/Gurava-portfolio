import unittest

from support import run_solution


class First3AndLast3ElementsOfListTest(unittest.TestCase):
    def test_case_01_six_values(self):
        """six values."""
        result = run_solution('first-3-and-last-3-elements-of-list', '6\na\nb\nc\nd\ne\nf\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['a', 'b', 'c', 'd', 'e', 'f']\n")

    def test_case_02_three_values(self):
        """three values."""
        result = run_solution('first-3-and-last-3-elements-of-list', '3\nx\ny\nz\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['x', 'y', 'z', 'x', 'y', 'z']\n")


if __name__ == "__main__":
    unittest.main()
