import unittest

from support import run_solution


class DenominationsTest(unittest.TestCase):
    def test_case_01_38(self):
        """38."""
        result = run_solution('denominations', '38\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5:7\n1:3\n')

    def test_case_02_27(self):
        """27."""
        result = run_solution('denominations', '27\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5:5\n1:2\n')

    def test_case_03_5(self):
        """5."""
        result = run_solution('denominations', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5:1\n1:0\n')


if __name__ == "__main__":
    unittest.main()
