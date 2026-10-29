import unittest

from support import run_solution


class PrimeNumber3Test(unittest.TestCase):
    def test_case_01_prime(self):
        """prime."""
        result = run_solution('prime-number-3', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Prime Number\n')

    def test_case_02_composite(self):
        """composite."""
        result = run_solution('prime-number-3', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not a Prime Number\n')


if __name__ == "__main__":
    unittest.main()
