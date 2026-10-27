import unittest

from support import run_solution


class PrintTheInputTest(unittest.TestCase):
    def test_case_01_hello_world(self):
        """Hello World."""
        result = run_solution('print-the-input', 'Hello World\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello World\n')

    def test_case_02_spaces_preserved(self):
        """Spaces preserved."""
        result = run_solution('print-the-input', '  spaced  \n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  spaced  \n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('print-the-input', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_unicode_line(self):
        """Unicode line."""
        result = run_solution('print-the-input', 'ನಮಸ್ಕಾರ\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ನಮಸ್ಕಾರ\n')


if __name__ == "__main__":
    unittest.main()
