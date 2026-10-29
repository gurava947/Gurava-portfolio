import unittest

from support import run_solution


class JoinThirdLetterOfWordsTest(unittest.TestCase):
    def test_case_01_three_words(self):
        """three words."""
        result = run_solution('join-third-letter-of-words', 'Hello World Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'l,r,t\n')

    def test_case_02_four_words(self):
        """four words."""
        result = run_solution('join-third-letter-of-words', 'Code With Plain Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'd,t,a,t\n')


if __name__ == "__main__":
    unittest.main()
