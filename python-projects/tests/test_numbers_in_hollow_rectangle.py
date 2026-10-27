import unittest

from support import run_solution


class NumbersInHollowRectangleTest(unittest.TestCase):
    def test_case_01_a_3_b_4(self):
        """A = 3, B = 4."""
        result = run_solution('numbers-in-hollow-rectangle', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7 8 9 10 \n7     10 \n7 8 9 10 \n')

    def test_case_02_a_4_b_3(self):
        """A = 4, B = 3."""
        result = run_solution('numbers-in-hollow-rectangle', '4\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7 8 9 \n7   9 \n7   9 \n7 8 9 \n')


if __name__ == "__main__":
    unittest.main()
