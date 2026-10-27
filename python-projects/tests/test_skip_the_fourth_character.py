import unittest

from support import run_solution


class SkipTheFourthCharacterTest(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('skip-the-fourth-character', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pyton\n')

    def test_case_02_abcdef(self):
        """abcdef."""
        result = run_solution('skip-the-fourth-character', 'abcdef')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abcef\n')

    def test_edge_01_three_character_word(self):
        """Three-character word."""
        result = run_solution('skip-the-fourth-character', 'abc')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc\n')

    def test_edge_02_empty_string(self):
        """Empty string."""
        result = run_solution('skip-the-fourth-character', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
