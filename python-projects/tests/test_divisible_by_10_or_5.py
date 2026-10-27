import unittest

from support import run_solution


class DivisibleBy10Or5Test(unittest.TestCase):
    def test_case_01_20_is_divisible_by_10(self):
        """20 is divisible by 10."""
        result = run_solution('divisible-by-10-or-5', '20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Divisible by 10\n')

    def test_case_02_15_is_divisible_by_5(self):
        """15 is divisible by 5."""
        result = run_solution('divisible-by-10-or-5', '15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Divisible by 5\n')

    def test_case_03_7_is_divisible_by_neither(self):
        """7 is divisible by neither."""
        result = run_solution('divisible-by-10-or-5', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not Divisible by 10 or 5\n')

    def test_case_04_0_is_divisible_by_10(self):
        """0 is divisible by 10."""
        result = run_solution('divisible-by-10-or-5', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Divisible by 10\n')


if __name__ == "__main__":
    unittest.main()
