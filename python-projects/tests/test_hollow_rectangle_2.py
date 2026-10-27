import unittest

from support import run_solution


class HollowRectangle2Test(unittest.TestCase):
    def test_case_01_m_3_n_4(self):
        """M = 3, N = 4."""
        result = run_solution('hollow-rectangle-2', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '+----+ \n|    | \n|    | \n|    | \n+----+ \n')

    def test_case_02_m_2_n_3(self):
        """M = 2, N = 3."""
        result = run_solution('hollow-rectangle-2', '2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '+---+ \n|   | \n|   | \n+---+ \n')


if __name__ == "__main__":
    unittest.main()
