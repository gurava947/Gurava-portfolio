import unittest

from support import run_solution


class Denominations3Test(unittest.TestCase):
    def test_case_01_1234(self):
        """1234."""
        result = run_solution('denominations-3', '1234\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '500: 2 50: 4 10: 3 1: 4\n')

    def test_case_02_578(self):
        """578."""
        result = run_solution('denominations-3', '578\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '500: 1 50: 1 10: 2 1: 8\n')

    def test_case_03_999(self):
        """999."""
        result = run_solution('denominations-3', '999\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '500: 1 50: 9 10: 4 1: 9\n')


if __name__ == "__main__":
    unittest.main()
