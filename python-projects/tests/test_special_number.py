import unittest

from support import run_solution


class SpecialNumberTest(unittest.TestCase):
    def test_case_01_25_has_digit_sum_7(self):
        """25 has digit sum 7."""
        result = run_solution('special-number', '25\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special Number\n')

    def test_case_02_71_contains_7(self):
        """71 contains 7."""
        result = run_solution('special-number', '71\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special Number\n')

    def test_case_03_14_is_a_multiple_of_7(self):
        """14 is a multiple of 7."""
        result = run_solution('special-number', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special Number\n')

    def test_case_04_23_is_normal(self):
        """23 is normal."""
        result = run_solution('special-number', '23\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Normal Number\n')


if __name__ == "__main__":
    unittest.main()
