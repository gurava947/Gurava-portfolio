import unittest

from support import run_solution


class PrimeNumbersFromMToN3Test(unittest.TestCase):
    def test_case_01_ten_to_twenty(self):
        """ten to twenty."""
        result = run_solution('prime-numbers-from-m-to-n-3', '10\n20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '11 13 17 19\n')

    def test_case_02_one_to_ten(self):
        """one to ten."""
        result = run_solution('prime-numbers-from-m-to-n-3', '1\n10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2 3 5 7\n')


if __name__ == "__main__":
    unittest.main()
