import unittest

from support import run_solution


class SpecialStringTest(unittest.TestCase):
    def test_case_01_nxt12_is_even(self):
        """NXT12 is even."""
        result = run_solution('special-string', 'NXT12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special String\n')

    def test_case_02_nxt7_is_divisible_by_7(self):
        """NXT7 is divisible by 7."""
        result = run_solution('special-string', 'NXT7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special String\n')

    def test_case_03_nxt9_is_neither(self):
        """NXT9 is neither."""
        result = run_solution('special-string', 'NXT9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not a Special String\n')

    def test_case_04_abc14_has_the_wrong_prefix(self):
        """ABC14 has the wrong prefix."""
        result = run_solution('special-string', 'ABC14\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Not a Special String\n')


if __name__ == "__main__":
    unittest.main()
