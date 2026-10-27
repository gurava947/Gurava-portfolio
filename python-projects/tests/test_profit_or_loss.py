import unittest

from support import run_solution


class ProfitOrLossTest(unittest.TestCase):
    def test_case_01_sp_80_cp_100(self):
        """SP 80, CP 100."""
        result = run_solution('profit-or-loss', '80\n100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Profit\n')

    def test_case_02_sp_120_cp_100(self):
        """SP 120, CP 100."""
        result = run_solution('profit-or-loss', '120\n100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Loss\n')

    def test_case_03_sp_100_cp_100(self):
        """SP 100, CP 100."""
        result = run_solution('profit-or-loss', '100\n100\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No Profit - No Loss\n')


if __name__ == "__main__":
    unittest.main()
