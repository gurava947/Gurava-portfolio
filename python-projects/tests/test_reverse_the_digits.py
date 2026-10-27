import unittest

from support import run_solution


class ReverseTheDigitsTest(unittest.TestCase):
    def test_case_01_12(self):
        """12."""
        result = run_solution('reverse-the-digits', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '21\n')

    def test_case_02_90(self):
        """90."""
        result = run_solution('reverse-the-digits', '90\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '09\n')

    def test_edge_01_three_digits_uses_first_two(self):
        """Three digits uses first two."""
        result = run_solution('reverse-the-digits', '123\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '21\n')

    def test_edge_02_too_short(self):
        """Too short."""
        result = run_solution('reverse-the-digits', '1\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")

    def test_edge_03_empty_line(self):
        """Empty line."""
        result = run_solution('reverse-the-digits', '\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
