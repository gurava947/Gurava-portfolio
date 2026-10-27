import unittest

from support import run_solution


class NumberOrRemainderTest(unittest.TestCase):
    def test_case_01_35_is_a_multiple_of_5_and_7(self):
        """35 is a multiple of 5 and 7."""
        result = run_solution('number-or-remainder', '35\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '35\n')

    def test_case_02_5_is_below_7(self):
        """5 is below 7."""
        result = run_solution('number-or-remainder', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_03_12_prints_two_remainders(self):
        """12 prints two remainders."""
        result = run_solution('number-or-remainder', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n5\n')

    def test_case_04_8_prints_two_remainders(self):
        """8 prints two remainders."""
        result = run_solution('number-or-remainder', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n1\n')


if __name__ == "__main__":
    unittest.main()
