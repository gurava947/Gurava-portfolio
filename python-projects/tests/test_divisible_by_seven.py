import unittest

from support import run_solution


class DivisibleBySevenTest(unittest.TestCase):
    def test_case_01_14_is_divisible(self):
        """14 is divisible."""
        result = run_solution('divisible-by-seven', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Divisible by Seven\n')

    def test_case_02_20_is_not_divisible(self):
        """20 is not divisible."""
        result = run_solution('divisible-by-seven', '20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not Divisible by Seven\n')

    def test_case_03_0_is_divisible(self):
        """0 is divisible."""
        result = run_solution('divisible-by-seven', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Divisible by Seven\n')

    def test_case_04_49_is_divisible(self):
        """49 is divisible."""
        result = run_solution('divisible-by-seven', '49\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Divisible by Seven\n')


if __name__ == "__main__":
    unittest.main()
