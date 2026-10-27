import unittest

from support import run_solution


class StarsTest(unittest.TestCase):
    def test_case_01_ccbp(self):
        """CCBP."""
        result = run_solution('stars', 'CCBP\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * CCBP * * *\n')

    def test_case_02_python(self):
        """Python."""
        result = run_solution('stars', 'Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * Python * * *\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('stars', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * *  * * *\n')

    def test_edge_02_unicode_word(self):
        """Unicode word."""
        result = run_solution('stars', 'గురు\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * గురు * * *\n')


if __name__ == "__main__":
    unittest.main()
