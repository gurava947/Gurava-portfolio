import unittest

from support import run_solution


class PrintNIntegers3Test(unittest.TestCase):
    def test_case_01_three(self):
        """three."""
        result = run_solution('print-n-integers-3', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n2\n3\n')

    def test_case_02_five(self):
        """five."""
        result = run_solution('print-n-integers-3', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n2\n3\n4\n5\n')


if __name__ == "__main__":
    unittest.main()
