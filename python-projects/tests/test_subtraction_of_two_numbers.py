import unittest

from support import run_solution


class SubtractionOfTwoNumbersTest(unittest.TestCase):
    def test_case_01_5_5_minus_2_5(self):
        """5.5 minus 2.5."""
        result = run_solution('subtraction-of-two-numbers', '5.5\n2.5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3.0\n')

    def test_case_02_10_0_minus_4_5(self):
        """10.0 minus 4.5."""
        result = run_solution('subtraction-of-two-numbers', '10.0\n4.5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5.5\n')

    def test_edge_01_negative_result(self):
        """Negative result."""
        result = run_solution('subtraction-of-two-numbers', '2.0\n5.0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-3.0\n')

    def test_edge_02_integers_accepted_as_floats(self):
        """Integers accepted as floats."""
        result = run_solution('subtraction-of-two-numbers', '10\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7.0\n')


if __name__ == "__main__":
    unittest.main()
