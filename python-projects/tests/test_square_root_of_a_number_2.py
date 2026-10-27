import unittest

from support import run_solution


class SquareRootOfANumber2Test(unittest.TestCase):
    def test_case_01_square_root_of_9_is_3(self):
        """Square root of 9 is 3."""
        result = run_solution('square-root-of-a-number-2', '9\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Square root of A is equal to B\n')

    def test_case_02_square_root_of_25_is_5(self):
        """Square root of 25 is 5."""
        result = run_solution('square-root-of-a-number-2', '25\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Square root of A is equal to B\n')

    def test_case_03_square_root_of_8_is_not_3(self):
        """Square root of 8 is not 3."""
        result = run_solution('square-root-of-a-number-2', '8\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Square root of A is not equal to B\n')

    def test_case_04_square_root_of_10_is_not_4(self):
        """Square root of 10 is not 4."""
        result = run_solution('square-root-of-a-number-2', '10\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Square root of A is not equal to B\n')


if __name__ == "__main__":
    unittest.main()
