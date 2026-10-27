import unittest

from support import run_solution


class NumbersInRightAngledTriangleTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('numbers-in-right-angled-triangle', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 \n1 2 \n1 2 3 \n1 2 3 4 \n')

    def test_case_02_n_2(self):
        """N = 2."""
        result = run_solution('numbers-in-right-angled-triangle', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 \n1 2 \n')


if __name__ == "__main__":
    unittest.main()
