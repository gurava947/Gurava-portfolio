import unittest

from support import run_solution


class IndivisibleNumbersTest(unittest.TestCase):
    def test_case_01_n_10(self):
        """N = 10."""
        result = run_solution('indivisible-numbers', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_02_n_30(self):
        """N = 30."""
        result = run_solution('indivisible-numbers', '30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
