import unittest

from support import run_solution


class ElectricityBillTest(unittest.TestCase):
    def test_case_01_40_units(self):
        """40 units."""
        result = run_solution('electricity-bill', '40\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '96.0\n')

    def test_case_02_100_units(self):
        """100 units."""
        result = run_solution('electricity-bill', '100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '300.0\n')

    def test_case_03_200_units(self):
        """200 units."""
        result = run_solution('electricity-bill', '200\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '780.0\n')

    def test_case_04_300_units(self):
        """300 units."""
        result = run_solution('electricity-bill', '300\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1560.0\n')


if __name__ == "__main__":
    unittest.main()
