import unittest

from support import run_solution


class ReplaceFirstLetterInWordsTest(unittest.TestCase):
    def test_case_01_cat_dog(self):
        """cat dog."""
        result = run_solution('replace-first-letter-in-words', 'cat dog\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'dat eog\n')

    def test_case_02_abc(self):
        """abc."""
        result = run_solution('replace-first-letter-in-words', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'bbc\n')


if __name__ == "__main__":
    unittest.main()
