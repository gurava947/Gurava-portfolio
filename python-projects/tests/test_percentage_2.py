import unittest

from support import run_solution


class Percentage2Test(unittest.TestCase):
    def test_case_01_50(self):
        """50."""
        result = run_solution('percentage-2', '50')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '35.0\n')

    def test_case_02_200(self):
        """200."""
        result = run_solution('percentage-2', '200')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '140.0\n')

    def test_edge_01_zero(self):
        """Zero."""
        result = run_solution('percentage-2', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0.0\n')

    def test_edge_02_negative(self):
        """Negative."""
        result = run_solution('percentage-2', '-100')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-70.0\n')


if __name__ == "__main__":
    unittest.main()
