import unittest

from support import run_solution


class KthLargestFactor2Test(unittest.TestCase):
    def test_case_01_n_12_k_3(self):
        """N = 12, K = 3."""
        result = run_solution('kth-largest-factor-2', '12\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')

    def test_case_02_n_12_k_1(self):
        """N = 12, K = 1."""
        result = run_solution('kth-largest-factor-2', '12\n1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '12\n')

    def test_case_03_n_7_k_5(self):
        """N = 7, K = 5."""
        result = run_solution('kth-largest-factor-2', '7\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
