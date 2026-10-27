import unittest

from support import run_solution


class LargestFactorOfANumberTest(unittest.TestCase):
    def test_case_01_n_10(self):
        """N = 10."""
        result = run_solution('largest-factor-of-a-number', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_02_n_7(self):
        """N = 7."""
        result = run_solution('largest-factor-of-a-number', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
