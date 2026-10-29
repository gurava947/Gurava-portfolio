import unittest

from support import run_solution


class HyphenateLettersTest(unittest.TestCase):
    def test_case_01_abc123(self):
        """abc123."""
        result = run_solution('hyphenate-letters', 'abc123\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a-b-c123\n')

    def test_case_02_i9(self):
        """Hi9."""
        result = run_solution('hyphenate-letters', 'Hi9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'H-i9\n')


if __name__ == "__main__":
    unittest.main()
