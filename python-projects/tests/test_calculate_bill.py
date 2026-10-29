import unittest

from support import run_solution


class CalculateBillTest(unittest.TestCase):
    def test_case_01_five_percent_band(self):
        """five percent band."""
        result = run_solution('calculate-bill', '100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '95.0\n')

    def test_case_02_ten_percent_band(self):
        """ten percent band."""
        result = run_solution('calculate-bill', '1000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '900.0\n')

    def test_case_03_twenty_percent_band(self):
        """twenty percent band."""
        result = run_solution('calculate-bill', '3000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2400.0\n')


if __name__ == "__main__":
    unittest.main()
