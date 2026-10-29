import unittest

from support import run_solution


class FirstHalfWordsOfListTest(unittest.TestCase):
    def test_case_01_even_count(self):
        """even count."""
        result = run_solution('first-half-words-of-list', 'one two three four\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['one', 'two']\n")

    def test_case_02_odd_count(self):
        """odd count."""
        result = run_solution('first-half-words-of-list', 'one two three\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['one', 'two']\n")


if __name__ == "__main__":
    unittest.main()
