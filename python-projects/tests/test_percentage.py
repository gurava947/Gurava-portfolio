import unittest

from support import run_solution


class PercentageTest(unittest.TestCase):
    def test_case_01_10(self):
        """10."""
        result = run_solution('percentage', '10')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20.0\n')

    def test_case_02_7(self):
        """7."""
        result = run_solution('percentage', '7')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '14.0\n')

    def test_edge_01_zero(self):
        """Zero."""
        result = run_solution('percentage', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0.0\n')

    def test_edge_02_negative(self):
        """Negative."""
        result = run_solution('percentage', '-3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-6.0\n')


if __name__ == "__main__":
    unittest.main()
