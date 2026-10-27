import unittest

from support import run_solution


class PrintTheScore3Test(unittest.TestCase):
    def test_case_01_30_units(self):
        """30 units."""
        result = run_solution('print-the-score-3', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '110\n')

    def test_case_02_50_units(self):
        """50 units."""
        result = run_solution('print-the-score-3', '50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '190\n')

    def test_case_03_61_units(self):
        """61 units."""
        result = run_solution('print-the-score-3', '61\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '236\n')

    def test_case_04_70_units(self):
        """70 units."""
        result = run_solution('print-the-score-3', '70\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '290\n')


if __name__ == "__main__":
    unittest.main()
