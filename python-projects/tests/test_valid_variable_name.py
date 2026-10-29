import unittest

from support import run_solution


class ValidVariableNameTest(unittest.TestCase):
    def test_case_01_hello(self):
        """hello."""
        result = run_solution('valid-variable-name', 'hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_1abc(self):
        """1abc."""
        result = run_solution('valid-variable-name', '1abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
