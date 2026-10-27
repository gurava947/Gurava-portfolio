import unittest

from support import run_solution


class KthLargestFactorTest(unittest.TestCase):
    def test_case_01_n_12_k_3(self):
        """N = 12, K = 3."""
        result = run_solution('kth-largest-factor', '12\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n2\n3\n4\n6\n12\n')

    def test_case_02_n_7_k_2(self):
        """N = 7, K = 2."""
        result = run_solution('kth-largest-factor', '7\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n7\n')


if __name__ == "__main__":
    unittest.main()
