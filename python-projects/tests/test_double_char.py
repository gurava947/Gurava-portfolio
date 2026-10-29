import unittest

from support import run_solution


class DoubleCharTest(unittest.TestCase):
    def test_case_01_abc(self):
        """abc."""
        result = run_solution('double-char', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'aabbcc')

    def test_case_02_i(self):
        """Hi."""
        result = run_solution('double-char', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'HHii')


if __name__ == "__main__":
    unittest.main()
