import unittest

from support import run_solution


class ReverseWordsInListTest(unittest.TestCase):
    def test_case_01_three_words(self):
        """three words."""
        result = run_solution('reverse-words-in-list', 'Practice makes perfect\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['perfect', 'makes', 'Practice']\n")

    def test_case_02_two_words(self):
        """two words."""
        result = run_solution('reverse-words-in-list', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['World', 'Hello']\n")


if __name__ == "__main__":
    unittest.main()
