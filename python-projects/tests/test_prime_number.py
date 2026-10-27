import unittest

from support import run_solution


class PrimeNumberTest(unittest.TestCase):
    def test_case_01_n_7(self):
        """N = 7."""
        result = run_solution('prime-number', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Prime Number\n')

    def test_case_02_n_9(self):
        """N = 9."""
        result = run_solution('prime-number', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not a Prime Number\n')

    def test_case_03_n_1(self):
        """N = 1."""
        result = run_solution('prime-number', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Prime Number\n')


if __name__ == "__main__":
    unittest.main()
