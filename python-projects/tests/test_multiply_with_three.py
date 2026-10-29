import unittest

from support import run_solution


class MultiplyWithThreeTest(unittest.TestCase):
    def test_case_01_five(self):
        """five."""
        result = run_solution('multiply-with-three', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '15\n')

    def test_case_02_twelve(self):
        """twelve."""
        result = run_solution('multiply-with-three', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '36\n')


if __name__ == "__main__":
    unittest.main()
