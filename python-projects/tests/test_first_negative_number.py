import unittest

from support import run_solution


class FirstNegativeNumberTest(unittest.TestCase):
    def test_case_01_5_3_7_2(self):
        """5, -3, 7, -2."""
        result = run_solution('first-negative-number', '4\n5\n-3\n7\n-2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-3\n')

    def test_case_02_1_2_3(self):
        """1, 2, 3."""
        result = run_solution('first-negative-number', '3\n1\n2\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
