import unittest

from support import run_solution


class UnicodeValueOfFirstDigitTest(unittest.TestCase):
    def test_case_01_abc5(self):
        """abc5."""
        result = run_solution('unicode-value-of-first-digit', 'abc5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '53\n')

    def test_case_02_ear_2026(self):
        """Year 2026."""
        result = run_solution('unicode-value-of-first-digit', 'Year 2026\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '50\n')


if __name__ == "__main__":
    unittest.main()
