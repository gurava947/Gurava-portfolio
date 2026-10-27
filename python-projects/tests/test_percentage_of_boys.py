import unittest

from support import run_solution


class PercentageOfBoysTest(unittest.TestCase):
    def test_case_01_40_percent_girls(self):
        """40 percent girls."""
        result = run_solution('percentage-of-boys', '40')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '60\n')

    def test_case_02_25_percent_girls(self):
        """25 percent girls."""
        result = run_solution('percentage-of-boys', '25')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '75\n')

    def test_edge_01_all_girls(self):
        """All girls."""
        result = run_solution('percentage-of-boys', '100')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_edge_02_all_boys(self):
        """All boys."""
        result = run_solution('percentage-of-boys', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100\n')


if __name__ == "__main__":
    unittest.main()
