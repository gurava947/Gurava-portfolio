import unittest

from support import run_solution


class SumOfListElementsTest(unittest.TestCase):
    def test_case_01_one_to_five(self):
        """one to five."""
        result = run_solution('sum-of-list-elements', '1 2 3 4 5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '15\n')

    def test_case_02_three_tens(self):
        """three tens."""
        result = run_solution('sum-of-list-elements', '10 20 30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '60\n')


if __name__ == "__main__":
    unittest.main()
