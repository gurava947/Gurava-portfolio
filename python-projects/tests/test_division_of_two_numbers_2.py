import unittest

from support import run_solution


class DivisionOfTwoNumbers2Test(unittest.TestCase):
    def test_case_01_7_divided_by_2(self):
        """7 divided by 2."""
        result = run_solution('division-of-two-numbers-2', '7\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_02_10_divided_by_4(self):
        """10 divided by 4."""
        result = run_solution('division-of-two-numbers-2', '10\n4')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_edge_01_exact_division(self):
        """Exact division."""
        result = run_solution('division-of-two-numbers-2', '9\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_edge_02_division_by_zero(self):
        """Division by zero."""
        result = run_solution('division-of-two-numbers-2', '5\n0')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('ZeroDivisionError', result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
