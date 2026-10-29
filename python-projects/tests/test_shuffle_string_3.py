import unittest

from support import run_solution


class ShuffleString3Test(unittest.TestCase):
    def test_case_01_ascending(self):
        """ascending."""
        result = run_solution('shuffle-string-3', 'Python\n0 2 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pto\n')

    def test_case_02_descending(self):
        """descending."""
        result = run_solution('shuffle-string-3', 'Practice\n5 3 1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'icr\n')


if __name__ == "__main__":
    unittest.main()
