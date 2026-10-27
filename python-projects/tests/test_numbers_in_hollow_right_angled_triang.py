import unittest

from support import run_solution


class NumbersInHollowRightAngledTriangTest(unittest.TestCase):
    def test_case_01_s_3_n_3(self):
        """S = 3, N = 3."""
        result = run_solution('numbers-in-hollow-right-angled-triang', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 \n4 5 \n6 7 8 \n')

    def test_case_02_s_7_n_4(self):
        """S = 7, N = 4."""
        result = run_solution('numbers-in-hollow-right-angled-triang', '7\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7 \n8 9 \n10   11 \n12 13 14 15 \n')


if __name__ == "__main__":
    unittest.main()
