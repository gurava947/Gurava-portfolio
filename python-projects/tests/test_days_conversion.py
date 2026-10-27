import unittest

from support import run_solution


class DaysConversionTest(unittest.TestCase):
    def test_case_01_400_days(self):
        """400 days."""
        result = run_solution('days-conversion', '400\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 years 5 weeks 0 days\n')

    def test_case_02_1000_days(self):
        """1000 days."""
        result = run_solution('days-conversion', '1000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2 years 38 weeks 4 days\n')

    def test_case_03_0_days(self):
        """0 days."""
        result = run_solution('days-conversion', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 years 0 weeks 0 days\n')

    def test_case_04_14_days(self):
        """14 days."""
        result = run_solution('days-conversion', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 years 2 weeks 0 days\n')


if __name__ == "__main__":
    unittest.main()
