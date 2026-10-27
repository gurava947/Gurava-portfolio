import unittest

from support import run_solution


class SumOfPrimeNumbersInInputsTest(unittest.TestCase):
    def test_case_01_2_3_4_5(self):
        """2, 3, 4, 5."""
        result = run_solution('sum-of-prime-numbers-in-inputs', '4\n2\n3\n4\n5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')

    def test_case_02_4_6_8(self):
        """4, 6, 8."""
        result = run_solution('sum-of-prime-numbers-in-inputs', '3\n4\n6\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
