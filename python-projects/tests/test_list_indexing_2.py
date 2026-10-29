import unittest

from support import run_solution


class ListIndexing2Test(unittest.TestCase):
    def test_case_01_indices_0_and_3(self):
        """indices 0 and 3."""
        result = run_solution('list-indexing-2', '2\n0\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\nPython\n3\nC\n')

    def test_case_02_index_11(self):
        """index 11."""
        result = run_solution('list-indexing-2', '1\n11\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '11\nPerl\n')


if __name__ == "__main__":
    unittest.main()
