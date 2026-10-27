import unittest

from support import run_solution


class PairOfNumbers2Test(unittest.TestCase):
    def test_case_01_12_and_15_form_a_pair(self):
        """12 and 15 form a pair."""
        result = run_solution('pair-of-numbers-2', '12\n15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pair\n')

    def test_case_02_6_and_9_are_not_a_pair(self):
        """6 and 9 are not a pair."""
        result = run_solution('pair-of-numbers-2', '6\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not a Pair\n')

    def test_case_03_24_and_9_form_a_pair(self):
        """24 and 9 form a pair."""
        result = run_solution('pair-of-numbers-2', '24\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pair\n')

    def test_case_04_4_and_12_are_not_a_pair(self):
        """4 and 12 are not a pair."""
        result = run_solution('pair-of-numbers-2', '4\n12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not a Pair\n')


if __name__ == "__main__":
    unittest.main()
