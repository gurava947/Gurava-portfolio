import unittest

from support import run_solution


class NumberDiamondTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('number-diamond', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   1 \n  1 2 \n 1 2 3 \n1 2 3 4 \n 1 2 3 \n  1 2 \n   1 \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('number-diamond', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  1 \n 1 2 \n1 2 3 \n 1 2 \n  1 \n')


if __name__ == "__main__":
    unittest.main()
