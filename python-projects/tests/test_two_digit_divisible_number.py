import unittest

from support import run_solution


class TwoDigitDivisibleNumberTest(unittest.TestCase):
    def test_case_01_12_both_digits_divide(self):
        """12: both digits divide."""
        result = run_solution('two-digit-divisible-number', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '24\n')

    def test_case_02_14_4_does_not_divide(self):
        """14: 4 does not divide."""
        result = run_solution('two-digit-divisible-number', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '14\n')

    def test_case_03_36_both_digits_divide(self):
        """36: both digits divide."""
        result = run_solution('two-digit-divisible-number', '36\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '72\n')

    def test_case_04_25_2_does_not_divide(self):
        """25: 2 does not divide."""
        result = run_solution('two-digit-divisible-number', '25\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '25\n')


if __name__ == "__main__":
    unittest.main()
