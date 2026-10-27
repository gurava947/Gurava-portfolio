import unittest

from support import run_solution


class GcdTest(unittest.TestCase):
    def test_case_01_m_12_n_18(self):
        """M = 12, N = 18."""
        result = run_solution('gcd', '12\n18\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')

    def test_case_02_m_7_n_5(self):
        """M = 7, N = 5."""
        result = run_solution('gcd', '7\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
