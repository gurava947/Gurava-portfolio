import unittest

from support import run_solution


class QuotientAndRemainderTest(unittest.TestCase):
    def test_case_01_17_divided_by_5(self):
        """17 divided by 5."""
        result = run_solution('quotient-and-remainder', '17\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n2\n')

    def test_case_02_100_divided_by_8(self):
        """100 divided by 8."""
        result = run_solution('quotient-and-remainder', '100\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '12\n4\n')

    def test_case_03_9_divided_by_4(self):
        """9 divided by 4."""
        result = run_solution('quotient-and-remainder', '9\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n1\n')

    def test_case_04_20_divided_by_5(self):
        """20 divided by 5."""
        result = run_solution('quotient-and-remainder', '20\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n0\n')


if __name__ == "__main__":
    unittest.main()
