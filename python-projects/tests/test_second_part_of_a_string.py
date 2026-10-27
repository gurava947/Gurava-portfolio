import unittest

from support import run_solution


class SecondPartOfAStringTest(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('second-part-of-a-string', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'thon\n')

    def test_case_02_ab(self):
        """ab."""
        result = run_solution('second-part-of-a-string', 'ab')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_01_empty_string(self):
        """Empty string."""
        result = run_solution('second-part-of-a-string', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_one_character(self):
        """One character."""
        result = run_solution('second-part-of-a-string', 'A')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
