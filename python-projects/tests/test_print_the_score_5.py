import unittest

from support import run_solution


class PrintTheScore5Test(unittest.TestCase):
    def test_case_01_50_units(self):
        """50 units."""
        result = run_solution('print-the-score-5', '50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '250\n')

    def test_case_02_100_units(self):
        """100 units."""
        result = run_solution('print-the-score-5', '100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '500\n')

    def test_case_03_150_units(self):
        """150 units."""
        result = run_solution('print-the-score-5', '150\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '800\n')

    def test_case_04_250_units(self):
        """250 units."""
        result = run_solution('print-the-score-5', '250\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1600\n')


if __name__ == "__main__":
    unittest.main()
