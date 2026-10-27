import unittest

from support import run_solution


class PrimeNumbersFrom1ToNTest(unittest.TestCase):
    def test_case_01_n_10(self):
        """N = 10."""
        result = run_solution('prime-numbers-from-1-to-n', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n3\n5\n7\n')

    def test_case_02_n_2(self):
        """N = 2."""
        result = run_solution('prime-numbers-from-1-to-n', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')


if __name__ == "__main__":
    unittest.main()
