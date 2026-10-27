import unittest

from support import run_solution


class PrintTheValueTest(unittest.TestCase):
    def test_case_01_5t_means_50(self):
        """5T means 50."""
        result = run_solution('print-the-value', '5T\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '50\n')

    def test_case_02_3h_means_300(self):
        """3H means 300."""
        result = run_solution('print-the-value', '3H\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '300\n')

    def test_case_03_2k_means_2000(self):
        """2K means 2000."""
        result = run_solution('print-the-value', '2K\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2000\n')


if __name__ == "__main__":
    unittest.main()
