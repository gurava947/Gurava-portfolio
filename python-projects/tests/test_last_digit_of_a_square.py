import unittest

from support import run_solution


class LastDigitOfASquareTest(unittest.TestCase):
    def test_case_01_5_squared_ends_in_5(self):
        """5 squared ends in 5."""
        result = run_solution('last-digit-of-a-square', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Equal\n')

    def test_case_02_6_squared_ends_in_6(self):
        """6 squared ends in 6."""
        result = run_solution('last-digit-of-a-square', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Equal\n')

    def test_case_03_12_squared_ends_in_4(self):
        """12 squared ends in 4."""
        result = run_solution('last-digit-of-a-square', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not Equal\n')

    def test_case_04_13_squared_ends_in_9(self):
        """13 squared ends in 9."""
        result = run_solution('last-digit-of-a-square', '13\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not Equal\n')


if __name__ == "__main__":
    unittest.main()
