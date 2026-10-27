import unittest

from support import run_solution


class ExponentOfANumberTest(unittest.TestCase):
    def test_case_01_2_to_the_power_10(self):
        """2 to the power 10."""
        result = run_solution('exponent-of-a-number', '2\n10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1024\n')

    def test_case_02_3_to_the_power_4(self):
        """3 to the power 4."""
        result = run_solution('exponent-of-a-number', '3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '81\n')

    def test_case_03_5_to_the_power_0(self):
        """5 to the power 0."""
        result = run_solution('exponent-of-a-number', '5\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_04_10_to_the_power_3(self):
        """10 to the power 3."""
        result = run_solution('exponent-of-a-number', '10\n3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1000\n')


if __name__ == "__main__":
    unittest.main()
