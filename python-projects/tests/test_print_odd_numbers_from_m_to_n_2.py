import unittest

from support import run_solution


class PrintOddNumbersFromMToN2Test(unittest.TestCase):
    def test_case_01_one_to_ten(self):
        """one to ten."""
        result = run_solution('print-odd-numbers-from-m-to-n-2', '1\n10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 3 5 7 9 \n')

    def test_case_02_two_to_eight(self):
        """two to eight."""
        result = run_solution('print-odd-numbers-from-m-to-n-2', '2\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 5 7 \n')


if __name__ == "__main__":
    unittest.main()
