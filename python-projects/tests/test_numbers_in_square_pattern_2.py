import unittest

from support import run_solution


class NumbersInSquarePattern2Test(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('numbers-in-square-pattern-2', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 1 1 \n2 2 2 \n3 3 3 \n')

    def test_case_02_n_5(self):
        """N = 5."""
        result = run_solution('numbers-in-square-pattern-2', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 1 1 1 1 \n2 2 2 2 2 \n3 3 3 3 3 \n4 4 4 4 4 \n5 5 5 5 5 \n')


if __name__ == "__main__":
    unittest.main()
