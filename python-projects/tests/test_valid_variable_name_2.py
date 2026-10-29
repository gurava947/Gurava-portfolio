import unittest

from support import run_solution


class ValidVariableName2Test(unittest.TestCase):
    def test_case_01_abc(self):
        """abc."""
        result = run_solution('valid-variable-name-2', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'True\n')

    def test_case_02_5abc(self):
        """5abc."""
        result = run_solution('valid-variable-name-2', '5abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'False\n')


if __name__ == "__main__":
    unittest.main()
