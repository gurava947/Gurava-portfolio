import unittest

from support import run_solution


class HalfLengthOfStringTest(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('half-length-of-string', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2.5\n')

    def test_case_02_hi(self):
        """Hi."""
        result = run_solution('half-length-of-string', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.0\n')

    def test_edge_01_odd_length(self):
        """Odd length."""
        result = run_solution('half-length-of-string', 'Hi!\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1.5\n')

    def test_edge_02_empty_line(self):
        """Empty line."""
        result = run_solution('half-length-of-string', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0.0\n')


if __name__ == "__main__":
    unittest.main()
