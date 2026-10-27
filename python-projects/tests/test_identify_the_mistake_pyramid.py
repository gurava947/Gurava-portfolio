import unittest

from support import run_solution


class IdentifyTheMistakePyramidTest(unittest.TestCase):
    def test_case_01_n_4(self):
        """N = 4."""
        result = run_solution('identify-the-mistake-pyramid', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '   * \n  * * \n * * * \n* * * * \n')

    def test_case_02_n_2(self):
        """N = 2."""
        result = run_solution('identify-the-mistake-pyramid', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, ' * \n* * \n')


if __name__ == "__main__":
    unittest.main()
