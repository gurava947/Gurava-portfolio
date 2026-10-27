import unittest

from support import run_solution


class GreatestAmongRemaindersTest(unittest.TestCase):
    def test_case_01_n_9(self):
        """N = 9."""
        result = run_solution('greatest-among-remainders', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')

    def test_case_02_n_6(self):
        """N = 6."""
        result = run_solution('greatest-among-remainders', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_03_n_20_tie(self):
        """N = 20 (tie)."""
        result = run_solution('greatest-among-remainders', '20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_case_04_n_14(self):
        """N = 14."""
        result = run_solution('greatest-among-remainders', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')


if __name__ == "__main__":
    unittest.main()
