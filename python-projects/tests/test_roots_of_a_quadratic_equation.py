import unittest

from support import run_solution


class RootsOfAQuadraticEquationTest(unittest.TestCase):
    def test_case_01_x_squared_minus_5x_plus_6(self):
        """x squared minus 5x plus 6."""
        result = run_solution('roots-of-a-quadratic-equation', '1\n-5\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3.0\n2.0\n')

    def test_case_02_x_squared_minus_4(self):
        """x squared minus 4."""
        result = run_solution('roots-of-a-quadratic-equation', '1\n0\n-4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2.0\n-2.0\n')


if __name__ == "__main__":
    unittest.main()
