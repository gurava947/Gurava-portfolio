import unittest

from support import run_solution


class ReplacingCharactersOfSentenceTest(unittest.TestCase):
    def test_case_01_abc_def(self):
        """abc def."""
        result = run_solution('replacing-characters-of-sentence', 'abc def\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'bcd efg\n')

    def test_case_02_i(self):
        """Hi."""
        result = run_solution('replacing-characters-of-sentence', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Ij\n')


if __name__ == "__main__":
    unittest.main()
