import unittest

from support import run_solution


class WeekDayTest(unittest.TestCase):
    def test_case_01_day_1(self):
        """Day 1."""
        result = run_solution('week-day', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Week Start\n')

    def test_case_02_day_4(self):
        """Day 4."""
        result = run_solution('week-day', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Midweek\n')

    def test_case_03_day_6(self):
        """Day 6."""
        result = run_solution('week-day', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Weekend\n')

    def test_case_04_day_9(self):
        """Day 9."""
        result = run_solution('week-day', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
