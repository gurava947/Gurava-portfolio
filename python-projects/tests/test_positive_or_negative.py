import unittest

from support import run_solution


class PositiveOrNegativeTest(unittest.TestCase):
    def test_case_01_5_is_positive(self):
        """5 is positive."""
        result = run_solution('positive-or-negative', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Positive\n')

    def test_case_02_3_is_negative(self):
        """-3 is negative."""
        result = run_solution('positive-or-negative', '-3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Negative\n')

    def test_case_03_0_prints_nothing(self):
        """0 prints nothing."""
        result = run_solution('positive-or-negative', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
