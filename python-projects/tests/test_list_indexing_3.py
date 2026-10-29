import unittest

from support import run_solution


class ListIndexing3Test(unittest.TestCase):
    def test_case_01_five_values_indices_0_and_4(self):
        """five values, indices 0 and 4."""
        result = run_solution('list-indexing-3', '5\n2\n10\n20\n30\n40\n50\n0\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n50\n')

    def test_case_02_three_values_index_2(self):
        """three values, index 2."""
        result = run_solution('list-indexing-3', '3\n1\n7\n8\n9\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9\n')


if __name__ == "__main__":
    unittest.main()
