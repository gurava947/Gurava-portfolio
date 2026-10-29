import unittest

from support import run_solution


class ProductOfElementsInTheListTest(unittest.TestCase):
    def test_case_01_three_values(self):
        """three values."""
        result = run_solution('product-of-elements-in-the-list', '2 3 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '24\n')

    def test_case_02_contains_zero(self):
        """contains zero."""
        result = run_solution('product-of-elements-in-the-list', '6 0 7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
