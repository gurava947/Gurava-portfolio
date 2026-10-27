import unittest

from support import run_solution


class ReplaceALetterTest(unittest.TestCase):
    def test_case_01_python_index_2_x(self):
        """Python index 2 X."""
        result = run_solution('replace-a-letter', 'Python\n2\nX')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'PyXhon\n')

    def test_case_02_hello_index_0_j(self):
        """Hello index 0 J."""
        result = run_solution('replace-a-letter', 'Hello\n0\nJ')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Jello\n')

    def test_edge_01_last_index(self):
        """Last index."""
        result = run_solution('replace-a-letter', 'abc\n2\nZ')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abZ\n')

    def test_edge_02_index_beyond_end(self):
        """Index beyond end."""
        result = run_solution('replace-a-letter', 'abc\n9\nZ')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abcZ\n')


if __name__ == "__main__":
    unittest.main()
