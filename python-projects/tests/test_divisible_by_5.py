import unittest

from support import run_solution


class DivisibleBy5Test(unittest.TestCase):
    def test_case_01_five_values(self):
        """five values."""
        result = run_solution('divisible-by-5', '5\n10\n7\n25\n3\n50\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[10, 25, 50]\n')

    def test_case_02_none_match(self):
        """none match."""
        result = run_solution('divisible-by-5', '3\n1\n2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[]\n')


if __name__ == "__main__":
    unittest.main()
