import unittest

from support import run_solution


class Subtract1FromStringLength2Test(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('subtract-1-from-string-length-2', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')

    def test_case_02_hi(self):
        """Hi."""
        result = run_solution('subtract-1-from-string-length-2', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('subtract-1-from-string-length-2', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-1\n')

    def test_edge_02_unicode_line(self):
        """Unicode line."""
        result = run_solution('subtract-1-from-string-length-2', 'ನಮಸ್ಕಾರ\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '6\n')


if __name__ == "__main__":
    unittest.main()
