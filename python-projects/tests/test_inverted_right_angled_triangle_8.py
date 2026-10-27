import unittest

from support import run_solution


class InvertedRightAngledTriangle8Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('inverted-right-angled-triangle-8', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * * * * * \n    * * * * * \n        * * * \n            * \n')

    def test_case_02_n_2(self):
        """N = 2."""
        result = run_solution('inverted-right-angled-triangle-8', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * \n    * \n')


if __name__ == "__main__":
    unittest.main()
