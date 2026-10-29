import unittest

from support import run_solution


class UppercaseAndLowercaseLettersTest(unittest.TestCase):
    def test_case_01_mixed(self):
        """mixed."""
        result = run_solution('uppercase-and-lowercase-letters', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'HW\nelloorld\n')

    def test_case_02_no_lowercase(self):
        """no lowercase."""
        result = run_solution('uppercase-and-lowercase-letters', 'PYTHON\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'PYTHON\n\n')


if __name__ == "__main__":
    unittest.main()
