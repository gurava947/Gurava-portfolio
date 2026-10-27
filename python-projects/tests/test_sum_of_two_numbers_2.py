import unittest

from support import run_solution


class SumOfTwoNumbers2Test(unittest.TestCase):
    def test_case_01_2_5_and_3_5(self):
        """2.5 and 3.5."""
        result = run_solution('sum-of-two-numbers-2', '2.5\n3.5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sum: 6.0\n')

    def test_case_02_1_and_2(self):
        """1 and 2."""
        result = run_solution('sum-of-two-numbers-2', '1\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sum: 3.0\n')

    def test_edge_01_negative_sum(self):
        """Negative sum."""
        result = run_solution('sum-of-two-numbers-2', '-2.5\n1.0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sum: -1.5\n')

    def test_edge_02_zeroes(self):
        """Zeroes."""
        result = run_solution('sum-of-two-numbers-2', '0\n0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Sum: 0.0\n')


if __name__ == "__main__":
    unittest.main()
