import unittest

from support import run_solution


class PrintTheInput3Test(unittest.TestCase):
    def test_case_01_hello_and_world(self):
        """Hello and World."""
        result = run_solution('print-the-input-3', 'Hello\nWorld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hello\nWorld\n')

    def test_case_02_two_phrases(self):
        """Two phrases."""
        result = run_solution('print-the-input-3', 'first line\nsecond line\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'first line\nsecond line\n')

    def test_edge_01_two_empty_lines(self):
        """Two empty lines."""
        result = run_solution('print-the-input-3', '\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n\n')

    def test_edge_02_unicode_lines(self):
        """Unicode lines."""
        result = run_solution('print-the-input-3', 'మొదటి\nరెండవ\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'మొదటి\nరెండవ\n')


if __name__ == "__main__":
    unittest.main()
