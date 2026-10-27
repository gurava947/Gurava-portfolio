import unittest

from support import run_solution


class InvertedRightAngledTriangle7Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('inverted-right-angled-triangle-7', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * * \n* * * \n* * \n* \n')

    def test_case_02_n_1(self):
        """N = 1."""
        result = run_solution('inverted-right-angled-triangle-7', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* \n')


if __name__ == "__main__":
    unittest.main()
