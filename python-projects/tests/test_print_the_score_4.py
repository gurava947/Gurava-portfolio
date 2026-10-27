import unittest

from support import run_solution


class PrintTheScore4Test(unittest.TestCase):
    def test_case_01_40_units(self):
        """40 units."""
        result = run_solution('print-the-score-4', '40\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '130\n')

    def test_case_02_50_units(self):
        """50 units."""
        result = run_solution('print-the-score-4', '50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '170\n')

    def test_case_03_100_units(self):
        """100 units."""
        result = run_solution('print-the-score-4', '100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '450\n')

    def test_case_04_150_units(self):
        """150 units."""
        result = run_solution('print-the-score-4', '150\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '810\n')


if __name__ == "__main__":
    unittest.main()
