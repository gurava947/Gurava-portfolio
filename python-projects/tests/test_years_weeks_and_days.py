import unittest

from support import run_solution


class YearsWeeksAndDaysTest(unittest.TestCase):
    def test_case_01_400_days(self):
        """400 days."""
        result = run_solution('years-weeks-and-days', '400\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n5\n0\n')

    def test_case_02_1000_days(self):
        """1000 days."""
        result = run_solution('years-weeks-and-days', '1000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n38\n4\n')

    def test_case_03_14_days(self):
        """14 days."""
        result = run_solution('years-weeks-and-days', '14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n2\n0\n')

    def test_case_04_10_days(self):
        """10 days."""
        result = run_solution('years-weeks-and-days', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n1\n3\n')


if __name__ == "__main__":
    unittest.main()
