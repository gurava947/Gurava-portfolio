import unittest

from support import run_solution


class PartOfAString2Test(unittest.TestCase):
    def test_case_01_python_1_to_3(self):
        """Python 1 to 3."""
        result = run_solution('part-of-a-string-2', 'Python\n1\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'yth\n')

    def test_case_02_hello_0_to_1(self):
        """Hello 0 to 1."""
        result = run_solution('part-of-a-string-2', 'Hello\n0\n1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'He\n')

    def test_edge_01_full_range(self):
        """Full range."""
        result = run_solution('part-of-a-string-2', 'abc\n0\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc\n')

    def test_edge_02_reversed_range(self):
        """Reversed range."""
        result = run_solution('part-of-a-string-2', 'abc\n2\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
