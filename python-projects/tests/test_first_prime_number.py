import unittest

from support import run_solution


class FirstPrimeNumberTest(unittest.TestCase):
    def test_case_01_4_6_7_8(self):
        """4, 6, 7, 8."""
        result = run_solution('first-prime-number', '4\n4\n6\n7\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')

    def test_case_02_4_6_8(self):
        """4, 6, 8."""
        result = run_solution('first-prime-number', '3\n4\n6\n8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
