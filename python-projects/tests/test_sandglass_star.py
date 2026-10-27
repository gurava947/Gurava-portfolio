import unittest

from support import run_solution


class SandglassStarTest(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('sandglass-star', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * \n * * \n  * \n * * \n* * * \n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('sandglass-star', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * * \n * * * \n  * * \n   * \n  * * \n * * * \n* * * * \n')


if __name__ == "__main__":
    unittest.main()
