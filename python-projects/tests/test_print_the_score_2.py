import unittest

from support import run_solution


class PrintTheScore2Test(unittest.TestCase):
    def test_case_01_50_units(self):
        """50 units."""
        result = run_solution('print-the-score-2', '50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '150\n')

    def test_case_02_60_units(self):
        """60 units."""
        result = run_solution('print-the-score-2', '60\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '200\n')

    def test_case_03_30_units(self):
        """30 units."""
        result = run_solution('print-the-score-2', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '90\n')


if __name__ == "__main__":
    unittest.main()
