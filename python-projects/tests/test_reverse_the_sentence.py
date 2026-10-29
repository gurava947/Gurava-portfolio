import unittest

from support import run_solution


class ReverseTheSentenceTest(unittest.TestCase):
    def test_case_01_one_word(self):
        """one word."""
        result = run_solution('reverse-the-sentence', 'Practice\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ecitcarP\n')

    def test_case_02_two_words(self):
        """two words."""
        result = run_solution('reverse-the-sentence', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'dlroW olleH\n')


if __name__ == "__main__":
    unittest.main()
