import unittest

from support import run_solution


class ListIndexingTest(unittest.TestCase):
    def test_case_01_index_4(self):
        """index 4."""
        result = run_solution('list-indexing', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Green\n')

    def test_case_02_index_0(self):
        """index 0."""
        result = run_solution('list-indexing', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Red\n')


if __name__ == "__main__":
    unittest.main()
