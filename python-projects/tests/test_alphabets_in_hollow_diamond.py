import unittest

from support import run_solution


class AlphabetsInHollowDiamondTest(unittest.TestCase):
    def test_case_01_3(self):
        """N = 3."""
        result = run_solution('alphabets-in-hollow-diamond', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  A \n B C \nD   E \n B C \n  A \n')

    def test_case_02_2(self):
        """N = 2."""
        result = run_solution('alphabets-in-hollow-diamond', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, ' A \nB C \n A \n')


if __name__ == "__main__":
    unittest.main()
