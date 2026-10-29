import unittest

from support import run_solution


class ReverseTheLettersInWordsOfTheOfTheSentenceTest(unittest.TestCase):
    def test_case_01_two_words(self):
        """two words."""
        result = run_solution('reverse-the-letters-in-words-of-the-of-the-sentence', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'olleH dlroW ')

    def test_case_02_three_words(self):
        """three words."""
        result = run_solution('reverse-the-letters-in-words-of-the-of-the-sentence', 'Practice makes perfect\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ecitcarP sekam tcefrep ')


if __name__ == "__main__":
    unittest.main()
