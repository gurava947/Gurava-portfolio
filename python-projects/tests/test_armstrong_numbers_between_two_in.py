import unittest

from support import run_solution


class ArmstrongNumbersBetweenTwoInTest(unittest.TestCase):
    def test_case_01_n_100_m_500(self):
        """N = 100, M = 500."""
        result = run_solution('armstrong-numbers-between-two-in', '100\n500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '153 370 371 407 \n')

    def test_case_02_n_100_m_150(self):
        """N = 100, M = 150."""
        result = run_solution('armstrong-numbers-between-two-in', '100\n150\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-1\n')


if __name__ == "__main__":
    unittest.main()
