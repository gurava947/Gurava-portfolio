import unittest

from support import run_solution


class NotDivisibleByNumbersTest(unittest.TestCase):
    def test_case_01_11_is_not_divisible_by_2_3_5_or_7(self):
        """11 is not divisible by 2, 3, 5 or 7."""
        result = run_solution('not-divisible-by-numbers', '11\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_105_is_divisible_by_7(self):
        """105 is divisible by 7."""
        result = run_solution('not-divisible-by-numbers', '105\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')

    def test_case_03_2_is_divisible_by_2(self):
        """2 is divisible by 2."""
        result = run_solution('not-divisible-by-numbers', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')

    def test_case_04_1_is_not_divisible_by_any(self):
        """1 is not divisible by any."""
        result = run_solution('not-divisible-by-numbers', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')


if __name__ == "__main__":
    unittest.main()
