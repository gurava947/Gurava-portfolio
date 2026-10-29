import unittest

from support import run_solution


class Percentage4Test(unittest.TestCase):
    def test_case_01_below_a_thousand(self):
        """below a thousand."""
        result = run_solution('percentage-4', '200\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10.0\n')

    def test_case_02_at_a_thousand(self):
        """at a thousand."""
        result = run_solution('percentage-4', '1000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '100.0\n')

    def test_case_03_above_a_thousand(self):
        """above a thousand."""
        result = run_solution('percentage-4', '2000\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '200.0\n')


if __name__ == "__main__":
    unittest.main()
