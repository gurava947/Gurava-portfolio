import unittest

from support import run_solution


class HollowFullPyramid2Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('hollow-full-pyramid-2', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   1 \n  1 2 \n 1   3 \n1 2 3 4 \n')

    def test_case_02_n_3(self):
        """N = 3."""
        result = run_solution('hollow-full-pyramid-2', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  1 \n 1 2 \n1 2 3 \n')


if __name__ == "__main__":
    unittest.main()
