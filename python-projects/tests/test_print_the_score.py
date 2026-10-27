import unittest

from support import run_solution


class PrintTheScoreTest(unittest.TestCase):
    def test_case_01_d_7(self):
        """D = 7."""
        result = run_solution('print-the-score', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')

    def test_case_02_d_10(self):
        """D = 10."""
        result = run_solution('print-the-score', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')

    def test_case_03_d_12(self):
        """D = 12."""
        result = run_solution('print-the-score', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '16\n')

    def test_case_04_d_20(self):
        """D = 20."""
        result = run_solution('print-the-score', '20\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '40\n')


if __name__ == "__main__":
    unittest.main()
