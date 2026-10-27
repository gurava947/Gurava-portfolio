import unittest

from support import run_solution


class TripletsOfNumbersTest(unittest.TestCase):
    def test_case_01_n_9(self):
        """N = 9."""
        result = run_solution('triplets-of-numbers', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_02_n_7(self):
        """N = 7."""
        result = run_solution('triplets-of-numbers', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
