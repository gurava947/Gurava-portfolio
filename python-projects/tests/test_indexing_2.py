import unittest

from support import run_solution


class Indexing2Test(unittest.TestCase):
    def test_case_01_position_two(self):
        """position two."""
        result = run_solution('indexing-2', 'Practice\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a\n')

    def test_case_02_position_zero(self):
        """position zero."""
        result = run_solution('indexing-2', 'Hello\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'H\n')


if __name__ == "__main__":
    unittest.main()
