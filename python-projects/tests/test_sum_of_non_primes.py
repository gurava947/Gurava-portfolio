import unittest

from support import run_solution


class SumOfNonPrimesTest(unittest.TestCase):
    def test_case_01_4_6_7_9(self):
        """4, 6, 7, 9."""
        result = run_solution('sum-of-non-primes', '4\n4\n6\n7\n9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '19\n')

    def test_case_02_2_3_5(self):
        """2, 3, 5."""
        result = run_solution('sum-of-non-primes', '3\n2\n3\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
