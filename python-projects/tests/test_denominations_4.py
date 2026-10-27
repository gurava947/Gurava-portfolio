import unittest

from support import run_solution


class Denominations4Test(unittest.TestCase):
    def test_case_01_1380(self):
        """1380."""
        result = run_solution('denominations-4', '1380\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100 Notes: 13\n50 Notes: 1\n20 Notes: 1\n10 Notes: 1\n')

    def test_case_02_260(self):
        """260."""
        result = run_solution('denominations-4', '260\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100 Notes: 2\n50 Notes: 1\n20 Notes: 0\n10 Notes: 1\n')

    def test_case_03_999(self):
        """999."""
        result = run_solution('denominations-4', '999\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100 Notes: 9\n50 Notes: 1\n20 Notes: 2\n10 Notes: 0\n')


if __name__ == "__main__":
    unittest.main()
