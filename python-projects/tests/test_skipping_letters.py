import unittest

from support import run_solution


class SkippingLettersTest(unittest.TestCase):
    def test_case_01_python_remove_index_2(self):
        """Python remove index 2."""
        result = run_solution('skipping-letters', 'Python\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pyhon\n')

    def test_case_02_hello_remove_index_1(self):
        """Hello remove index 1."""
        result = run_solution('skipping-letters', 'Hello\n1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hllo\n')

    def test_edge_01_index_0(self):
        """Index 0."""
        result = run_solution('skipping-letters', 'abc\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'bc\n')

    def test_edge_02_index_beyond_end(self):
        """Index beyond end."""
        result = run_solution('skipping-letters', 'abc\n9')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc\n')


if __name__ == "__main__":
    unittest.main()
