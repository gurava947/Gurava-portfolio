import unittest

from support import run_solution


class HalfStringTest(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('half-string', 'Hello')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'He\n')

    def test_case_02_python(self):
        """Python."""
        result = run_solution('half-string', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pyt\n')

    def test_edge_01_empty_string(self):
        """Empty string."""
        result = run_solution('half-string', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_one_character(self):
        """One character."""
        result = run_solution('half-string', 'A')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
