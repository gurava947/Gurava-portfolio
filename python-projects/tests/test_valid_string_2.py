import unittest

from support import run_solution


class ValidString2Test(unittest.TestCase):
    def test_case_01_exactly_five(self):
        """exactly five."""
        result = run_solution('valid-string-2', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Valid String\n')

    def test_case_02_too_short(self):
        """too short."""
        result = run_solution('valid-string-2', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Invalid String\n')


if __name__ == "__main__":
    unittest.main()
