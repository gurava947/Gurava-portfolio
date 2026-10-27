import unittest

from support import run_solution


class NumbersInHollowRectangle3Test(unittest.TestCase):
    def test_case_01_m_3_n_3(self):
        """M = 3, N = 3."""
        result = run_solution('numbers-in-hollow-rectangle-3', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9 8 7 \n6   4 \n3 2 1 \n')

    def test_case_02_m_4_n_3(self):
        """M = 4, N = 3."""
        result = run_solution('numbers-in-hollow-rectangle-3', '4\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '12 11 10 \n9   7 \n6   4 \n3 2 1 \n')


if __name__ == "__main__":
    unittest.main()
