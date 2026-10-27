import unittest

from support import run_solution


class ArmstrongNumber2Test(unittest.TestCase):
    def test_case_01_1634_is_an_armstrong_number(self):
        """1634 is an Armstrong number."""
        result = run_solution('armstrong-number-2', '1634\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Armstrong Number\n')

    def test_case_02_9474_is_an_armstrong_number(self):
        """9474 is an Armstrong number."""
        result = run_solution('armstrong-number-2', '9474\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Armstrong Number\n')

    def test_case_03_8208_is_an_armstrong_number(self):
        """8208 is an Armstrong number."""
        result = run_solution('armstrong-number-2', '8208\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Armstrong Number\n')

    def test_case_04_1234_is_not_an_armstrong_number(self):
        """1234 is not an Armstrong number."""
        result = run_solution('armstrong-number-2', '1234\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not an Armstrong Number\n')


if __name__ == "__main__":
    unittest.main()
