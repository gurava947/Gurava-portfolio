import unittest

from support import run_solution


class CountTheUpperCaseLettersTest(unittest.TestCase):
    def test_case_01_three_capitals(self):
        """three capitals."""
        result = run_solution('count-the-upper-case-letters', 'Practice Makes Perfect\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_02_none(self):
        """none."""
        result = run_solution('count-the-upper-case-letters', 'hello world\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
