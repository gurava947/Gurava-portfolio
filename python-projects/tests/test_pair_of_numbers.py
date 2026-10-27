import unittest

from support import run_solution


class PairOfNumbersTest(unittest.TestCase):
    def test_case_01_n_9(self):
        """N = 9."""
        result = run_solution('pair-of-numbers', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('pair-of-numbers', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
