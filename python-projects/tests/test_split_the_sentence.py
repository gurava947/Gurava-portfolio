import unittest

from support import run_solution


class SplitTheSentenceTest(unittest.TestCase):
    def test_case_01_three_words(self):
        """three words."""
        result = run_solution('split-the-sentence', 'Practice makes perfect\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['Practice', 'makes', 'perfect']\n")

    def test_case_02_single_word(self):
        """single word."""
        result = run_solution('split-the-sentence', 'Portfolio\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['Portfolio']\n")


if __name__ == "__main__":
    unittest.main()
