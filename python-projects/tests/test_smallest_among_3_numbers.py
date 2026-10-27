import unittest

from support import run_solution


class SmallestAmong3NumbersTest(unittest.TestCase):
    def test_case_01_5_2_9(self):
        """5, 2, 9."""
        result = run_solution('smallest-among-3-numbers', '5\n2\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_02_negative_values(self):
        """Negative values."""
        result = run_solution('smallest-among-3-numbers', '-3\n0\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-3\n')

    def test_case_03_all_equal(self):
        """All equal."""
        result = run_solution('smallest-among-3-numbers', '7\n7\n7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
