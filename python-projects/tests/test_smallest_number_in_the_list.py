import unittest

from support import run_solution


class SmallestNumberInTheListTest(unittest.TestCase):
    def test_case_01_five_values(self):
        """five values."""
        result = run_solution('smallest-number-in-the-list', '5 3 9 1 7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_02_four_values(self):
        """four values."""
        result = run_solution('smallest-number-in-the-list', '42 17 8 23\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8\n')


if __name__ == "__main__":
    unittest.main()
