import unittest

from support import run_solution


class HollowPyramid3Test(unittest.TestCase):
    def test_case_01_4(self):
        """N = 4."""
        result = run_solution('hollow-pyramid-3', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '| \n| \\ \n|  \\ \n|   \\ \n|   / \n|  / \n| / \n| \n')

    def test_case_02_2(self):
        """N = 2."""
        result = run_solution('hollow-pyramid-3', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '| \n| \\ \n| / \n| \n')


if __name__ == "__main__":
    unittest.main()
