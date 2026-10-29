import unittest

from support import run_solution


class JoinWordsInSentenceTest(unittest.TestCase):
    def test_case_01_three_words(self):
        """three words."""
        result = run_solution('join-words-in-sentence', 'Hello World Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello.World.Python\n')

    def test_case_02_two_words(self):
        """two words."""
        result = run_solution('join-words-in-sentence', 'Practice folio\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Practice.folio\n')


if __name__ == "__main__":
    unittest.main()
