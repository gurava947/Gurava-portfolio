import unittest

from support import run_solution


class UnicodeValueOfFirstUppercaseLetTest(unittest.TestCase):
    def test_case_01_ello_orld(self):
        """Hello World."""
        result = run_solution('unicode-value-of-first-uppercase-let', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '72\n')

    def test_case_02_abc(self):
        """abcD."""
        result = run_solution('unicode-value-of-first-uppercase-let', 'abcD\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '68\n')


if __name__ == "__main__":
    unittest.main()
