import unittest

from support import run_solution


class SumOfTwoNumbers3Test(unittest.TestCase):
    def test_case_01_both_positive(self):
        """both positive."""
        result = run_solution('sum-of-two-numbers-3', '10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '30\n')

    def test_case_02_one_negative(self):
        """one negative."""
        result = run_solution('sum-of-two-numbers-3', '5\n-3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')


if __name__ == "__main__":
    unittest.main()
