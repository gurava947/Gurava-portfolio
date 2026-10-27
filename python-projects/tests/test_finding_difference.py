import unittest

from support import run_solution


class FindingDifferenceTest(unittest.TestCase):
    def test_case_01_5_and_12(self):
        """5 and 12."""
        result = run_solution('finding-difference', '5\n12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')

    def test_case_02_negative_pair(self):
        """Negative pair."""
        result = run_solution('finding-difference', '-3\n-8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_03_positive_and_negative(self):
        """Positive and negative."""
        result = run_solution('finding-difference', '4\n-6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')

    def test_case_04_negative_and_positive(self):
        """Negative and positive."""
        result = run_solution('finding-difference', '-3\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-8\n')


if __name__ == "__main__":
    unittest.main()
