import unittest

from support import run_solution


class Between200And500Test(unittest.TestCase):
    def test_case_01_inside(self):
        """inside."""
        result = run_solution('between-200-and-500', '350\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Yes\n')

    def test_case_02_lower_bound(self):
        """lower bound."""
        result = run_solution('between-200-and-500', '200\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No\n')

    def test_case_03_above(self):
        """above."""
        result = run_solution('between-200-and-500', '500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'No\n')


if __name__ == "__main__":
    unittest.main()
