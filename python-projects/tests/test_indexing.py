import unittest

from support import run_solution


class IndexingTest(unittest.TestCase):
    def test_case_01_python_at_1(self):
        """Python at 1."""
        result = run_solution('indexing', 'Python\n1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'y\n')

    def test_case_02_hello_at_4(self):
        """Hello at 4."""
        result = run_solution('indexing', 'Hello\n4')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'o\n')

    def test_edge_01_first_character(self):
        """First character."""
        result = run_solution('indexing', 'World\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'W\n')

    def test_edge_02_index_out_of_range(self):
        """Index out of range."""
        result = run_solution('indexing', 'Hi\n5')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
