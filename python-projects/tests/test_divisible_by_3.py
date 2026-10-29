import unittest

from support import run_solution


class DivisibleBy3Test(unittest.TestCase):
    def test_case_01_some_match(self):
        """some match."""
        result = run_solution('divisible-by-3', '1 2 3 4 5 6 9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[3, 6, 9]\n')

    def test_case_02_none_match(self):
        """none match."""
        result = run_solution('divisible-by-3', '1 2 4 5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[]\n')


if __name__ == "__main__":
    unittest.main()
