import unittest

from support import run_solution


class BasicArithmeticTest(unittest.TestCase):
    def test_case_01_5_and_3(self):
        """5 and 3."""
        result = run_solution('basic-arithmetic', '5\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8\n2\n15\n')

    def test_case_02_10_and_4(self):
        """10 and 4."""
        result = run_solution('basic-arithmetic', '10\n4')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '14\n6\n40\n')

    def test_edge_01_negative_numbers(self):
        """Negative numbers."""
        result = run_solution('basic-arithmetic', '-2\n7')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n-9\n-14\n')

    def test_edge_02_zeroes(self):
        """Zeroes."""
        result = run_solution('basic-arithmetic', '0\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n0\n0\n')


if __name__ == "__main__":
    unittest.main()
