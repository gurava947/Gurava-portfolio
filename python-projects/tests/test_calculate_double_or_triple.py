import unittest

from support import run_solution


class CalculateDoubleOrTripleTest(unittest.TestCase):
    def test_case_01_n_9(self):
        """N = 9."""
        result = run_solution('calculate-double-or-triple', '9\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '27\n')

    def test_case_02_n_4(self):
        """N = 4."""
        result = run_solution('calculate-double-or-triple', '4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '8\n')

    def test_case_03_n_6(self):
        """N = 6."""
        result = run_solution('calculate-double-or-triple', '6\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '18\n')

    def test_case_04_n_10(self):
        """N = 10."""
        result = run_solution('calculate-double-or-triple', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '20\n')


if __name__ == "__main__":
    unittest.main()
