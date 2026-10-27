import unittest

from support import run_solution


class GetSeasonTest(unittest.TestCase):
    def test_case_01_month_4(self):
        """Month 4."""
        result = run_solution('get-season', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Summer\n')

    def test_case_02_month_8(self):
        """Month 8."""
        result = run_solution('get-season', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Rainy\n')

    def test_case_03_month_10(self):
        """Month 10."""
        result = run_solution('get-season', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Autumn\n')

    def test_case_04_month_12(self):
        """Month 12."""
        result = run_solution('get-season', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Winter\n')


if __name__ == "__main__":
    unittest.main()
