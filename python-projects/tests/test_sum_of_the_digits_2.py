import unittest

from support import run_solution


class SumOfTheDigits2Test(unittest.TestCase):
    def test_case_01_5(self):
        """5."""
        result = run_solution('sum-of-the-digits-2', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n')

    def test_case_02_42(self):
        """42."""
        result = run_solution('sum-of-the-digits-2', '42\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')

    def test_case_03_123(self):
        """123."""
        result = run_solution('sum-of-the-digits-2', '123\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')

    def test_case_04_1234(self):
        """1234."""
        result = run_solution('sum-of-the-digits-2', '1234\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')


if __name__ == "__main__":
    unittest.main()
