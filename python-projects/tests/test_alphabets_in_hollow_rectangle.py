import unittest

from support import run_solution


class AlphabetsInHollowRectangleTest(unittest.TestCase):
    def test_case_01_m_3_n_4(self):
        """M = 3, N = 4."""
        result = run_solution('alphabets-in-hollow-rectangle', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A B C D \nE     H \nI J K L \n')

    def test_case_02_m_4_n_3(self):
        """M = 4, N = 3."""
        result = run_solution('alphabets-in-hollow-rectangle', '4\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A B C \nD   F \nG   I \nJ K L \n')


if __name__ == "__main__":
    unittest.main()
