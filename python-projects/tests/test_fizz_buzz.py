import unittest

from support import run_solution


class FizzBuzzTest(unittest.TestCase):
    def test_case_01_divisible_by_three(self):
        """divisible by three."""
        result = run_solution('fizz-buzz', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Fizz\n')

    def test_case_02_divisible_by_five(self):
        """divisible by five."""
        result = run_solution('fizz-buzz', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Buzz\n')

    def test_case_03_divisible_by_both(self):
        """divisible by both."""
        result = run_solution('fizz-buzz', '15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'FizzBuzz\n')

    def test_case_04_neither(self):
        """neither."""
        result = run_solution('fizz-buzz', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
