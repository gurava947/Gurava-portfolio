import unittest

from support import run_solution


class WeatherReporterTest(unittest.TestCase):
    def test_case_01_cold(self):
        """cold."""
        result = run_solution('weather-reporter', '15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Cold\n')

    def test_case_02_at_the_cold_bound(self):
        """at the cold bound."""
        result = run_solution('weather-reporter', '18\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Cold\n')

    def test_case_03_warm(self):
        """warm."""
        result = run_solution('weather-reporter', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Warm\n')

    def test_case_04_hot(self):
        """hot."""
        result = run_solution('weather-reporter', '35\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hot\n')


if __name__ == "__main__":
    unittest.main()
