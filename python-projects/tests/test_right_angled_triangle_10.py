import unittest

from support import run_solution


class RightAngledTriangle10Test(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('right-angled-triangle-10', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* \n* * * \n* * * * * \n* * * * * * * \n')

    def test_case_02_n_1(self):
        """N = 1."""
        result = run_solution('right-angled-triangle-10', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* \n')


if __name__ == "__main__":
    unittest.main()
