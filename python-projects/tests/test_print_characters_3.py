import unittest

from support import run_solution


class PrintCharacters3Test(unittest.TestCase):
    def test_case_01_three_code_points(self):
        """three code points."""
        result = run_solution('print-characters-3', '3\n65\n66\n67\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ABC\n')

    def test_case_02_four_code_points(self):
        """four code points."""
        result = run_solution('print-characters-3', '4\n72\n105\n33\n33\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi!!\n')


if __name__ == "__main__":
    unittest.main()
