import unittest

from support import run_solution


class DivisibleByNumber2Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('divisible-by-number-2', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '12\n')

    def test_case_02_n_6(self):
        """N = 6."""
        result = run_solution('divisible-by-number-2', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '18\n')

    def test_case_03_n_5(self):
        """N = 5."""
        result = run_solution('divisible-by-number-2', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_04_n_7(self):
        """N = 7."""
        result = run_solution('divisible-by-number-2', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
