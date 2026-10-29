import unittest

from support import run_solution


class SplitTheSentence2Test(unittest.TestCase):
    def test_case_01_three_words(self):
        """three words."""
        result = run_solution('split-the-sentence-2', 'Practice makes perfect\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Practice\nmakes\nperfect\n')

    def test_case_02_two_words(self):
        """two words."""
        result = run_solution('split-the-sentence-2', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello\nWorld\n')


if __name__ == "__main__":
    unittest.main()
