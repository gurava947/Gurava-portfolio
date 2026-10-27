import unittest

from support import run_solution


class MultipleOf5Test(unittest.TestCase):
    def test_case_01_3_7_10_15(self):
        """3, 7, 10, 15."""
        result = run_solution('multiple-of-5', '4\n3\n7\n10\n15\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n7\n')

    def test_case_02_5_1_2(self):
        """5, 1, 2."""
        result = run_solution('multiple-of-5', '3\n5\n1\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
