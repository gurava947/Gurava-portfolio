import unittest

from support import run_solution


class NumberOfEvenDigitsTest(unittest.TestCase):
    def test_case_01_1234(self):
        """1234."""
        result = run_solution('number-of-even-digits', '1234\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Count of even digits is not greater than two\n')

    def test_case_02_2468(self):
        """2468."""
        result = run_solution('number-of-even-digits', '2468\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Count of even digits is greater than two\n')

    def test_case_03_1357(self):
        """1357."""
        result = run_solution('number-of-even-digits', '1357\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Count of even digits is not greater than two\n')


if __name__ == "__main__":
    unittest.main()
