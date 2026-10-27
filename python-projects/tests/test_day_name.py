import unittest

from support import run_solution


class DayNameTest(unittest.TestCase):
    def test_case_01_day_1(self):
        """Day 1."""
        result = run_solution('day-name', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Monday\n')

    def test_case_02_day_3(self):
        """Day 3."""
        result = run_solution('day-name', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Wednesday\n')

    def test_case_03_day_7(self):
        """Day 7."""
        result = run_solution('day-name', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sunday\n')

    def test_case_04_day_8(self):
        """Day 8."""
        result = run_solution('day-name', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
