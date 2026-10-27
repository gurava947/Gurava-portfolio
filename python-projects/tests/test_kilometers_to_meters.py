import unittest

from support import run_solution


class KilometersToMetersTest(unittest.TestCase):
    def test_case_01_1_5_km(self):
        """1.5 km."""
        result = run_solution('kilometers-to-meters', '1.5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1500\n')

    def test_case_02_2_75_km(self):
        """2.75 km."""
        result = run_solution('kilometers-to-meters', '2.75')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2750\n')

    def test_edge_01_zero_km(self):
        """Zero km."""
        result = run_solution('kilometers-to-meters', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_edge_02_fractional_metres_truncated(self):
        """Fractional metres truncated."""
        result = run_solution('kilometers-to-meters', '0.0009')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
