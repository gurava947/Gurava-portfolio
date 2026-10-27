import unittest

from support import run_solution


class DayName2Test(unittest.TestCase):
    def test_case_01_sunday_plus_1(self):
        """Sunday plus 1."""
        result = run_solution('day-name-2', 'Sunday\n1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sunday\n')

    def test_case_02_monday_plus_3(self):
        """Monday plus 3."""
        result = run_solution('day-name-2', 'Monday\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Wednesday\n')

    def test_case_03_saterday_plus_2(self):
        """Saterday plus 2."""
        result = run_solution('day-name-2', 'Saterday\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sunday\n')

    def test_case_04_friday_plus_0(self):
        """Friday plus 0."""
        result = run_solution('day-name-2', 'Friday\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Thursday\n')


if __name__ == "__main__":
    unittest.main()
