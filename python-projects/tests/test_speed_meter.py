import unittest

from support import run_solution


class SpeedMeterTest(unittest.TestCase):
    def test_case_01_normal(self):
        """normal."""
        result = run_solution('speed-meter', '40\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Normal\n')

    def test_case_02_at_the_limit(self):
        """at the limit."""
        result = run_solution('speed-meter', '50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Normal\n')

    def test_case_03_warning(self):
        """warning."""
        result = run_solution('speed-meter', '70\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Warning\n')

    def test_case_04_over(self):
        """over."""
        result = run_solution('speed-meter', '120\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Over Speed\n')


if __name__ == "__main__":
    unittest.main()
