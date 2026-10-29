import unittest

from support import run_solution


class CompareNumbers11Test(unittest.TestCase):
    def test_case_01_both_above(self):
        """both above."""
        result = run_solution('compare-numbers-11', '150\n200\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_first_larger(self):
        """first larger."""
        result = run_solution('compare-numbers-11', '200\n150\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')

    def test_case_03_both_below(self):
        """both below."""
        result = run_solution('compare-numbers-11', '50\n80\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
