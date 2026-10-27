import unittest

from support import run_solution


class PartOfAStringTest(unittest.TestCase):
    def test_case_01_python_from_2(self):
        """Python from 2."""
        result = run_solution('part-of-a-string', 'Python\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'thon\n')

    def test_case_02_hello_from_4(self):
        """Hello from 4."""
        result = run_solution('part-of-a-string', 'Hello\n4')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'o\n')

    def test_edge_01_from_0(self):
        """From 0."""
        result = run_solution('part-of-a-string', 'abc\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc\n')

    def test_edge_02_start_beyond_end(self):
        """Start beyond end."""
        result = run_solution('part-of-a-string', 'abc\n9')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
