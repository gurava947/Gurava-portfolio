import unittest

from support import run_solution


class LeapYearTest(unittest.TestCase):
    def test_case_01_2024_is_a_leap_year(self):
        """2024 is a leap year."""
        result = run_solution('leap-year', '2024\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_2023_is_not_a_leap_year(self):
        """2023 is not a leap year."""
        result = run_solution('leap-year', '2023\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')

    def test_case_03_2000_is_reported_as_not_leap(self):
        """2000 is reported as not leap."""
        result = run_solution('leap-year', '2000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')

    def test_case_04_1900_is_not_a_leap_year(self):
        """1900 is not a leap year."""
        result = run_solution('leap-year', '1900\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
