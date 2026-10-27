import unittest

from support import run_solution


class PrintTheInput2Test(unittest.TestCase):
    def test_case_01_hello(self):
        """Hello."""
        result = run_solution('print-the-input-2', 'Hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello\n###\n')

    def test_case_02_python(self):
        """Python."""
        result = run_solution('print-the-input-2', 'Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Python\n###\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('print-the-input-2', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n###\n')

    def test_edge_02_unicode_word(self):
        """Unicode word."""
        result = run_solution('print-the-input-2', 'ಗು\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ಗು\n###\n')


if __name__ == "__main__":
    unittest.main()
