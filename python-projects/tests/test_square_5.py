import unittest

from support import run_solution


class Square5Test(unittest.TestCase):
    def test_case_01_s_3_n_4(self):
        """S = 3, N = 4."""
        result = run_solution('square-5', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3 4 5 6 \n3 4 5 6 \n3 4 5 6 \n3 4 5 6 \n')

    def test_case_02_s_1_n_3(self):
        """S = 1, N = 3."""
        result = run_solution('square-5', '1\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 \n1 2 3 \n1 2 3 \n')


if __name__ == "__main__":
    unittest.main()
