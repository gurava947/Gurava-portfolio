import unittest

from support import run_solution


class StringRepetitionProgramTest(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('string-repetition-program', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello Hello Hello \n')

    def test_case_02_hi(self):
        """Hi."""
        result = run_solution('string-repetition-program', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi Hi Hi \n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('string-repetition-program', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   \n')

    def test_edge_02_words_with_spaces(self):
        """Words with spaces."""
        result = run_solution('string-repetition-program', 'a b\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a b a b a b \n')


if __name__ == "__main__":
    unittest.main()
