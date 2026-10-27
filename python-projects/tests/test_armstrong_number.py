import unittest

from support import run_solution


class ArmstrongNumberTest(unittest.TestCase):
    def test_case_01_153_is_an_armstrong_number(self):
        """153 is an Armstrong number."""
        result = run_solution('armstrong-number', '153\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_370_is_an_armstrong_number(self):
        """370 is an Armstrong number."""
        result = run_solution('armstrong-number', '370\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_03_123_is_not_an_armstrong_number(self):
        """123 is not an Armstrong number."""
        result = run_solution('armstrong-number', '123\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
