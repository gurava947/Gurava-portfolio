import unittest

from support import run_solution


class HollowDiamond2Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """n = 4."""
        result = run_solution('hollow-diamond-2', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   A\n  B B\n C   C\nD     D\n C   C\n  B B\n   A\n')

    def test_case_02_n_1(self):
        """n = 1."""
        result = run_solution('hollow-diamond-2', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'A\n')


if __name__ == "__main__":
    unittest.main()
