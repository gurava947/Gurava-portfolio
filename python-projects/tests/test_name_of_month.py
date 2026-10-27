import unittest

from support import run_solution


class NameOfMonthTest(unittest.TestCase):
    def test_case_01_month_1(self):
        """Month 1."""
        result = run_solution('name-of-month', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'January\n')

    def test_case_02_month_6(self):
        """Month 6."""
        result = run_solution('name-of-month', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'June\n')

    def test_case_03_month_12(self):
        """Month 12."""
        result = run_solution('name-of-month', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'December\n')

    def test_case_04_month_13(self):
        """Month 13."""
        result = run_solution('name-of-month', '13\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Invalid Month Number\n')


if __name__ == "__main__":
    unittest.main()
