import unittest

from support import run_solution


class LargestNumberInTheListTest(unittest.TestCase):
    def test_case_01_four_values(self):
        """four values."""
        result = run_solution('largest-number-in-the-list', '3 17 9 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '17\n')

    def test_case_02_repeated_maximum(self):
        """repeated maximum."""
        result = run_solution('largest-number-in-the-list', '5 5 2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')


if __name__ == "__main__":
    unittest.main()
