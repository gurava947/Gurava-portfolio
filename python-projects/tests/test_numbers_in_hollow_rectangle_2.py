import unittest

from support import run_solution


class NumbersInHollowRectangle2Test(unittest.TestCase):
    def test_case_01_m_3_n_4(self):
        """M = 3, N = 4."""
        result = run_solution('numbers-in-hollow-rectangle-2', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 4 \n5     8 \n9 10 11 12 \n')

    def test_case_02_m_4_n_3(self):
        """M = 4, N = 3."""
        result = run_solution('numbers-in-hollow-rectangle-2', '4\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 \n4   6 \n7   9 \n10 11 12 \n')


if __name__ == "__main__":
    unittest.main()
