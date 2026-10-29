import unittest

from support import run_solution


class Discount2Test(unittest.TestCase):
    def test_case_01_below_five_hundred(self):
        """below five hundred."""
        result = run_solution('discount-2', '400\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5%\n')

    def test_case_02_at_five_hundred(self):
        """at five hundred."""
        result = run_solution('discount-2', '500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10%\n')

    def test_case_03_at_two_thousand_five_hundred(self):
        """at two thousand five hundred."""
        result = run_solution('discount-2', '2500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20%\n')


if __name__ == "__main__":
    unittest.main()
