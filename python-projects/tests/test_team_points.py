import unittest

from support import run_solution


class TeamPointsTest(unittest.TestCase):
    def test_case_01_mixed_record(self):
        """mixed record."""
        result = run_solution('team-points', '10,5,2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '48\n')

    def test_case_02_all_losses(self):
        """all losses."""
        result = run_solution('team-points', '0,0,3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-3\n')


if __name__ == "__main__":
    unittest.main()
