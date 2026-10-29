import unittest

from support import run_solution


class SwapElementsInListTest(unittest.TestCase):
    def test_case_01_0_and_8(self):
        """0 and 8."""
        result = run_solution('swap-elements-in-list', '0\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "['six', 'two', 9, 5.09, 'Three', -558, 'four', -93.7, 1]\n")

    def test_case_02_1_and_3(self):
        """1 and 3."""
        result = run_solution('swap-elements-in-list', '1\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "[1, 5.09, 9, 'two', 'Three', -558, 'four', -93.7, 'six']\n")


if __name__ == "__main__":
    unittest.main()
