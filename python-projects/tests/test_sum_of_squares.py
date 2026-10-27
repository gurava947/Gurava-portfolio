import unittest

from support import run_solution


class SumOfSquaresTest(unittest.TestCase):
    def test_case_01_6_and_6_give_72(self):
        """6 and 6 give 72."""
        result = run_solution('sum-of-squares', '6\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Greater than or Equal to 60\n')

    def test_case_02_5_and_5_give_50(self):
        """5 and 5 give 50."""
        result = run_solution('sum-of-squares', '5\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Less than 60\n')

    def test_case_03_1_and_1_give_2(self):
        """1 and 1 give 2."""
        result = run_solution('sum-of-squares', '1\n1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Less than 60\n')

    def test_case_04_8_and_3_give_73(self):
        """8 and 3 give 73."""
        result = run_solution('sum-of-squares', '8\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Greater than or Equal to 60\n')


if __name__ == "__main__":
    unittest.main()
