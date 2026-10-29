import unittest

from support import run_solution


class CountOfLowercaseAndUppercaseLettersTest(unittest.TestCase):
    def test_case_01_mixed(self):
        """mixed."""
        result = run_solution('count-of-lowercase-and-uppercase-letters', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n8\n')

    def test_case_02_all_uppercase(self):
        """all uppercase."""
        result = run_solution('count-of-lowercase-and-uppercase-letters', 'PYTHON\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n0\n')


if __name__ == "__main__":
    unittest.main()
