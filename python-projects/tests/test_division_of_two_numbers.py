import unittest

from support import run_solution


class DivisionOfTwoNumbersTest(unittest.TestCase):
    def test_case_01_10_divided_by_2(self):
        """10 divided by 2."""
        result = run_solution('division-of-two-numbers', '10\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5.0\n')

    def test_case_02_7_divided_by_2(self):
        """7 divided by 2."""
        result = run_solution('division-of-two-numbers', '7\n2')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3.5\n')

    def test_edge_01_negative_division(self):
        """Negative division."""
        result = run_solution('division-of-two-numbers', '-6\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-2.0\n')

    def test_edge_02_division_by_zero(self):
        """Division by zero."""
        result = run_solution('division-of-two-numbers', '1\n0')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('ZeroDivisionError', result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
