import unittest

from support import run_solution


class GreatestAmongTheExponentsTest(unittest.TestCase):
    def test_case_01_2_3_versus_3_2(self):
        """2^3 versus 3^2."""
        result = run_solution('greatest-among-the-exponents', '2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9\n')

    def test_case_02_3_2_versus_2_3(self):
        """3^2 versus 2^3."""
        result = run_solution('greatest-among-the-exponents', '3\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9\n')

    def test_case_03_2_5_versus_5_2(self):
        """2^5 versus 5^2."""
        result = run_solution('greatest-among-the-exponents', '2\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '32\n')

    def test_case_04_4_2_versus_2_4_tie(self):
        """4^2 versus 2^4 (tie)."""
        result = run_solution('greatest-among-the-exponents', '4\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '16\n')


if __name__ == "__main__":
    unittest.main()
