import unittest

from support import run_solution


class GreatestAmongThreeNumbers2Test(unittest.TestCase):
    def test_case_01_3_9_4(self):
        """3, 9, 4."""
        result = run_solution('greatest-among-three-numbers-2', '3\n9\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9\n')

    def test_case_02_negative_values(self):
        """Negative values."""
        result = run_solution('greatest-among-three-numbers-2', '-1\n-5\n-2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-1\n')

    def test_case_03_ties(self):
        """Ties."""
        result = run_solution('greatest-among-three-numbers-2', '7\n7\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
