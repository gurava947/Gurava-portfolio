import unittest

from support import run_solution


class ShapeTest(unittest.TestCase):
    def test_case_01_three_plus_signs(self):
        """Three plus signs."""
        result = run_solution('shape', '3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '+ + + \n+ + + \n+ + + \n')

    def test_case_02_one_plus_sign(self):
        """One plus sign."""
        result = run_solution('shape', '1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '+ \n+ \n+ \n')

    def test_edge_01_zero(self):
        """Zero."""
        result = run_solution('shape', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n\n\n')

    def test_edge_02_negative(self):
        """Negative."""
        result = run_solution('shape', '-1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n\n\n')


if __name__ == "__main__":
    unittest.main()
