import unittest

from support import run_solution


class RankersTest(unittest.TestCase):
    def test_case_01_rank_2(self):
        """Rank 2."""
        result = run_solution('rankers', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'One of Top 3\n')

    def test_case_02_rank_7(self):
        """Rank 7."""
        result = run_solution('rankers', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not Top 3 but One of Top 10\n')

    def test_case_03_rank_3(self):
        """Rank 3."""
        result = run_solution('rankers', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'One of Top 3\n')

    def test_case_04_rank_12(self):
        """Rank 12."""
        result = run_solution('rankers', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
