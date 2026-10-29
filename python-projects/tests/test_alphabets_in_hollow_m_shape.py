import unittest

from support import run_solution


class AlphabetsInHollowMShapeTest(unittest.TestCase):
    def test_case_01_3(self):
        """N = 3."""
        result = run_solution('alphabets-in-hollow-m-shape', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  A     A \n B B   B B \nC   C C   C \n')

    def test_case_02_4(self):
        """N = 4."""
        result = run_solution('alphabets-in-hollow-m-shape', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   A       A \n  B B     B B \n C   C   C   C \nD     D D     D \n')


if __name__ == "__main__":
    unittest.main()
