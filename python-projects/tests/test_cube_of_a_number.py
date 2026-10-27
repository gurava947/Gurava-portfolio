import unittest

from support import run_solution


class CubeOfANumberTest(unittest.TestCase):
    def test_case_01_3_cubed(self):
        """3 cubed."""
        result = run_solution('cube-of-a-number', '3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '27\n')

    def test_case_02_10_cubed(self):
        """10 cubed."""
        result = run_solution('cube-of-a-number', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1000\n')

    def test_case_03_negative_input(self):
        """Negative input."""
        result = run_solution('cube-of-a-number', '-2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-8\n')

    def test_case_04_zero(self):
        """Zero."""
        result = run_solution('cube-of-a-number', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
