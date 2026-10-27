import unittest

from support import run_solution


class NumbersInRightAngledTriangle5Test(unittest.TestCase):
    def test_case_01_s_3_n_3(self):
        """S = 3, N = 3."""
        result = run_solution('numbers-in-right-angled-triangle-5', '3\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8 \n7 6 \n5 4 3 \n')

    def test_case_02_s_1_n_4(self):
        """S = 1, N = 4."""
        result = run_solution('numbers-in-right-angled-triangle-5', '1\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10 \n9 8 \n7 6 5 \n4 3 2 1 \n')


if __name__ == "__main__":
    unittest.main()
