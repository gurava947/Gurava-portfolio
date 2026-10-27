import unittest

from support import run_solution


class HalfString2Test(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('half-string-2', 'Hello')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'llo\n')

    def test_case_02_python(self):
        """Python."""
        result = run_solution('half-string-2', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hon\n')

    def test_edge_01_empty_string(self):
        """Empty string."""
        result = run_solution('half-string-2', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_one_character(self):
        """One character."""
        result = run_solution('half-string-2', 'A')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A\n')


if __name__ == "__main__":
    unittest.main()
