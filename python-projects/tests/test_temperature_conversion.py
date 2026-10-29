import unittest

from support import run_solution


class TemperatureConversionTest(unittest.TestCase):
    def test_case_01_100(self):
        """100C."""
        result = run_solution('temperature-conversion', '100C\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100.0C\n212.0F\n373.0K\n')

    def test_case_02_72(self):
        """72F."""
        result = run_solution('temperature-conversion', '72F\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '22.22C\n72.0F\n295.22K\n')


if __name__ == "__main__":
    unittest.main()
