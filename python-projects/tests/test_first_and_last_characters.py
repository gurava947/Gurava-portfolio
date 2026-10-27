import unittest

from support import run_solution


class FirstAndLastCharactersTest(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('first-and-last-characters', 'Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'P\nn\n')

    def test_case_02_single_character(self):
        """Single character."""
        result = run_solution('first-and-last-characters', 'A\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A\nA\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('first-and-last-characters', '\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")

    def test_edge_02_unicode_line(self):
        """Unicode line."""
        result = run_solution('first-and-last-characters', 'ಗು\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ಗ\nು\n')


if __name__ == "__main__":
    unittest.main()
