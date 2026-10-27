import unittest

from support import run_solution


class SquareRootOfANumberTest(unittest.TestCase):
    def test_case_01_square_root_of_16(self):
        """Square root of 16."""
        result = run_solution('square-root-of-a-number', '16\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4.0\n')

    def test_case_02_square_root_of_9(self):
        """Square root of 9."""
        result = run_solution('square-root-of-a-number', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3.0\n')

    def test_case_03_square_root_of_0(self):
        """Square root of 0."""
        result = run_solution('square-root-of-a-number', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0.0\n')

    def test_case_04_square_root_of_2(self):
        """Square root of 2."""
        result = run_solution('square-root-of-a-number', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.4142135623730951\n')


if __name__ == "__main__":
    unittest.main()
