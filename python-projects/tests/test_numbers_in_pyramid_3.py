import unittest

from support import run_solution


class NumbersInPyramid3Test(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('numbers-in-pyramid-3', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 0 1 0 0 \n0 1 1 1 0 \n1 1 1 1 1 \n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('numbers-in-pyramid-3', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0 0 0 1 0 0 0 \n0 0 1 1 1 0 0 \n0 1 1 1 1 1 0 \n1 1 1 1 1 1 1 \n')


if __name__ == "__main__":
    unittest.main()
