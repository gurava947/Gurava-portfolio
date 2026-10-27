import unittest

from support import run_solution


class RelationBetweenTwoNumbersTest(unittest.TestCase):
    def test_case_01_equal_values(self):
        """Equal values."""
        result = run_solution('relation-between-two-numbers', '5\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A == B\n')

    def test_case_02_a_is_greater(self):
        """A is greater."""
        result = run_solution('relation-between-two-numbers', '7\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A > B\n')

    def test_case_03_a_is_smaller(self):
        """A is smaller."""
        result = run_solution('relation-between-two-numbers', '2\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A < B\n')


if __name__ == "__main__":
    unittest.main()
