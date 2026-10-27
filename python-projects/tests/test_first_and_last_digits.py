import unittest

from support import run_solution


class FirstAndLastDigitsTest(unittest.TestCase):
    def test_case_01_1234(self):
        """1234."""
        result = run_solution('first-and-last-digits', '1234\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n4\n')

    def test_case_02_9876(self):
        """9876."""
        result = run_solution('first-and-last-digits', '9876\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '9\n6\n')

    def test_edge_01_six_digits_uses_index_3(self):
        """Six digits uses index 3."""
        result = run_solution('first-and-last-digits', '123456\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n4\n')

    def test_edge_02_too_short(self):
        """Too short."""
        result = run_solution('first-and-last-digits', '123\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")

    def test_edge_03_empty_line(self):
        """Empty line."""
        result = run_solution('first-and-last-digits', '\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
