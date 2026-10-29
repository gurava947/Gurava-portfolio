import unittest

from support import run_solution


class SumOfSquaresFromMToN2Test(unittest.TestCase):
    def test_case_01_one_to_three(self):
        """one to three."""
        result = run_solution('sum-of-squares-from-m-to-n-2', '1\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '14\n')

    def test_case_02_two_to_five(self):
        """two to five."""
        result = run_solution('sum-of-squares-from-m-to-n-2', '2\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '54\n')


if __name__ == "__main__":
    unittest.main()
