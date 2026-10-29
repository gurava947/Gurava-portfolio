import unittest

from support import run_solution


class CheckFirstLetterAndLastLetterOfTest(unittest.TestCase):
    def test_case_01_mixed_words(self):
        """mixed words."""
        result = run_solution('check-first-letter-and-last-letter-of', 'level test Anna\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\nTrue\nTrue\n')

    def test_case_02_none_match(self):
        """none match."""
        result = run_solution('check-first-letter-and-last-letter-of', 'abc xyq\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\nFalse\n')


if __name__ == "__main__":
    unittest.main()
