import unittest

from support import run_solution


class EvenOrOddTest(unittest.TestCase):
    def test_case_01_8_is_even(self):
        """8 is even."""
        result = run_solution('even-or-odd', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Even\n')

    def test_case_02_7_is_odd(self):
        """7 is odd."""
        result = run_solution('even-or-odd', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Odd\n')

    def test_case_03_0_is_even(self):
        """0 is even."""
        result = run_solution('even-or-odd', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Even\n')

    def test_case_04_13_is_odd(self):
        """13 is odd."""
        result = run_solution('even-or-odd', '13\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Odd\n')


if __name__ == "__main__":
    unittest.main()
