import unittest

from support import run_solution


class LastNWordsOfListTest(unittest.TestCase):
    def test_case_01_last_two(self):
        """last two."""
        result = run_solution('last-n-words-of-list', 'a b c d e\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['e', 'd']\n")

    def test_case_02_last_three(self):
        """last three."""
        result = run_solution('last-n-words-of-list', 'Practice makes perfect easy\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['easy', 'perfect', 'makes']\n")


if __name__ == "__main__":
    unittest.main()
