import unittest

from support import run_solution


class FirstUppercaseLetterTest(unittest.TestCase):
    def test_case_01_hello(self):
        """hEllo."""
        result = run_solution('first-uppercase-letter', 'hEllo\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'E\n')

    def test_case_02_abc(self):
        """abc."""
        result = run_solution('first-uppercase-letter', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
