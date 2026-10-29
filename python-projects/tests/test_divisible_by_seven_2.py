import unittest

from support import run_solution


class DivisibleBySeven2Test(unittest.TestCase):
    def test_case_01_multiple(self):
        """multiple."""
        result = run_solution('divisible-by-seven-2', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_not_a_multiple(self):
        """not a multiple."""
        result = run_solution('divisible-by-seven-2', '15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
