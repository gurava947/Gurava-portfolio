import unittest

from support import run_solution


class DivisibleByNineTest(unittest.TestCase):
    def test_case_01_middle_matches(self):
        """middle matches."""
        result = run_solution('divisible-by-nine', '5\n9\n11\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_none_match(self):
        """none match."""
        result = run_solution('divisible-by-nine', '1\n2\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
