import unittest

from support import run_solution


class FindTheGroupTest(unittest.TestCase):
    def test_case_01_7_is_odd(self):
        """7 is odd."""
        result = run_solution('find-the-group', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group A\n')

    def test_case_02_8_is_even(self):
        """8 is even."""
        result = run_solution('find-the-group', '8\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group B\n')

    def test_case_03_0_is_even(self):
        """0 is even."""
        result = run_solution('find-the-group', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Group B\n')


if __name__ == "__main__":
    unittest.main()
