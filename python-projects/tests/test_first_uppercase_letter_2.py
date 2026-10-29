import unittest

from support import run_solution


class FirstUppercaseLetter2Test(unittest.TestCase):
    def test_case_01_has_one(self):
        """has one."""
        result = run_solution('first-uppercase-letter-2', 'Practice\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'P\n')

    def test_case_02_none_present(self):
        """none present."""
        result = run_solution('first-uppercase-letter-2', 'python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'python\n')


if __name__ == "__main__":
    unittest.main()
