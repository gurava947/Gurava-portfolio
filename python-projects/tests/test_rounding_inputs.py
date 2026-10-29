import unittest

from support import run_solution


class RoundingInputsTest(unittest.TestCase):
    def test_case_01_two_values(self):
        """two values."""
        result = run_solution('rounding-inputs', '2\n3.14159\n2.5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3.14\n2.5\n')

    def test_case_02_one_value(self):
        """one value."""
        result = run_solution('rounding-inputs', '1\n7.005\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7.0\n')


if __name__ == "__main__":
    unittest.main()
