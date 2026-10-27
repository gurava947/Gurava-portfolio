import unittest

from support import run_solution


class LcmTest(unittest.TestCase):
    def test_case_01_m_12_n_18(self):
        """M = 12, N = 18."""
        result = run_solution('lcm', '12\n18\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '36\n')

    def test_case_02_m_4_n_6(self):
        """M = 4, N = 6."""
        result = run_solution('lcm', '4\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '12\n')


if __name__ == "__main__":
    unittest.main()
