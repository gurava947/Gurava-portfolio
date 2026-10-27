import unittest

from support import run_solution


class SimpleCalculatorTest(unittest.TestCase):
    def test_case_01_4_6(self):
        """4 + 6."""
        result = run_solution('simple-calculator', '+\n4\n6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')

    def test_case_02_3_4(self):
        """3 * 4."""
        result = run_solution('simple-calculator', '*\n3\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '12\n')

    def test_case_03_10_4(self):
        """10 / 4."""
        result = run_solution('simple-calculator', '/\n10\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2.5\n')

    def test_case_04_10_4_2(self):
        """10 % 4."""
        result = run_solution('simple-calculator', '%\n10\n4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')


if __name__ == "__main__":
    unittest.main()
