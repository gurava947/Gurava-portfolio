import unittest

from support import run_solution


class AtmPinCodeValidationTest(unittest.TestCase):
    def test_case_01_four_digits(self):
        """four digits."""
        result = run_solution('atm-pin-code-validation', '1234\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Valid PIN Code\n')

    def test_case_02_letters(self):
        """letters."""
        result = run_solution('atm-pin-code-validation', 'abcd\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Invalid PIN Code\n')

    def test_case_03_digits_then_letters(self):
        """digits then letters."""
        result = run_solution('atm-pin-code-validation', '12ab\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Valid PIN Code\n')

    def test_case_04_wrong_length(self):
        """wrong length."""
        result = run_solution('atm-pin-code-validation', '12345\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Invalid PIN Code\n')


if __name__ == "__main__":
    unittest.main()
