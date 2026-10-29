import unittest

from support import run_solution


class CumulativeSum2Test(unittest.TestCase):
    def test_case_01_2_4_6(self):
        """2, 4, 6."""
        result = run_solution('cumulative-sum-2', '3\n2\n4\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n6\n12\n')

    def test_case_02_10_and_3(self):
        """10 and -3."""
        result = run_solution('cumulative-sum-2', '2\n10\n-3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n7\n')


if __name__ == "__main__":
    unittest.main()
