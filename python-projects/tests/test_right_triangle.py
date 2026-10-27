import unittest

from support import run_solution


class RightTriangleTest(unittest.TestCase):
    def test_case_01_n_3(self):
        """N = 3."""
        result = run_solution('right-triangle', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n121\n12321\n\n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('right-triangle', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n121\n12321\n1234321\n\n')


if __name__ == "__main__":
    unittest.main()
