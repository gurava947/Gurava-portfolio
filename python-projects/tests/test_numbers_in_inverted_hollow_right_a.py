import unittest

from support import run_solution


class NumbersInInvertedHollowRightATest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('numbers-in-inverted-hollow-right-a', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10 9 8 7 \n6   4 \n3 2 \n1 \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('numbers-in-inverted-hollow-right-a', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6 5 4 \n3 2 \n1 \n')


if __name__ == "__main__":
    unittest.main()
