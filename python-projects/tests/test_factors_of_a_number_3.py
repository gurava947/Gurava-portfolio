import unittest

from support import run_solution


class FactorsOfANumber3Test(unittest.TestCase):
    def test_case_01_six(self):
        """six."""
        result = run_solution('factors-of-a-number-3', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 3 6 \n')

    def test_case_02_ten(self):
        """ten."""
        result = run_solution('factors-of-a-number-3', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1 2 5 10 \n')


if __name__ == "__main__":
    unittest.main()
