import unittest

from support import run_solution


class RelationBetweenTwoNumbers2Test(unittest.TestCase):
    def test_case_01_4_versus_9(self):
        """4 versus 9."""
        result = run_solution('relation-between-two-numbers-2', '4\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A < B\n')

    def test_case_02_9_versus_4(self):
        """9 versus 4."""
        result = run_solution('relation-between-two-numbers-2', '9\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A > B\n')

    def test_case_03_6_versus_6(self):
        """6 versus 6."""
        result = run_solution('relation-between-two-numbers-2', '6\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A == B\n')


if __name__ == "__main__":
    unittest.main()
