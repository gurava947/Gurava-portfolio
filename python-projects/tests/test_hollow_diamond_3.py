import unittest

from support import run_solution


class HollowDiamond3Test(unittest.TestCase):
    def test_case_01_90(self):
        """90M."""
        result = run_solution('hollow-diamond-3', '90M\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.5H\n')

    def test_case_02_45(self):
        """45M."""
        result = run_solution('hollow-diamond-3', '45M\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0.75H\n')


if __name__ == "__main__":
    unittest.main()
