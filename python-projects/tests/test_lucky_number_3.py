import unittest

from support import run_solution


class LuckyNumber3Test(unittest.TestCase):
    def test_case_01_12_is_divisible_by_6(self):
        """12 is divisible by 6."""
        result = run_solution('lucky-number-3', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Number is divisible by 6\n')

    def test_case_02_9_is_divisible_by_3(self):
        """9 is divisible by 3."""
        result = run_solution('lucky-number-3', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Number is divisible by 3\n')

    def test_case_03_8_is_divisible_by_2(self):
        """8 is divisible by 2."""
        result = run_solution('lucky-number-3', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Number is divisible by 2\n')

    def test_case_04_7_is_divisible_by_none(self):
        """7 is divisible by none."""
        result = run_solution('lucky-number-3', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Number is not divisible by 2, 3 or 6\n')


if __name__ == "__main__":
    unittest.main()
