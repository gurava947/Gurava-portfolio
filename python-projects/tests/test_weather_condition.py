import unittest

from support import run_solution


class WeatherConditionTest(unittest.TestCase):
    def test_case_01_5_is_freezing(self):
        """-5 is freezing."""
        result = run_solution('weather-condition', '-5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Freezing weather\n')

    def test_case_02_15_is_cold(self):
        """15 is cold."""
        result = run_solution('weather-condition', '15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Cold weather\n')

    def test_case_03_25_is_normal(self):
        """25 is normal."""
        result = run_solution('weather-condition', '25\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Normal\n')

    def test_case_04_45_is_very_hot(self):
        """45 is very hot."""
        result = run_solution('weather-condition', '45\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Very Hot\n')


if __name__ == "__main__":
    unittest.main()
