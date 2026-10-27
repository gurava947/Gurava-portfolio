import unittest

from support import run_solution


class PrintInReverseOrder2Test(unittest.TestCase):
    def test_case_01_first_and_second(self):
        """first and second."""
        result = run_solution('print-in-reverse-order-2', 'first\nsecond\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'second\n###\nsecond\n')

    def test_case_02_hello_and_world(self):
        """Hello and World."""
        result = run_solution('print-in-reverse-order-2', 'Hello\nWorld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'World\n###\nWorld\n')

    def test_edge_01_missing_second_line(self):
        """Missing second line."""
        result = run_solution('print-in-reverse-order-2', 'only\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('EOFError', result.stderr)
        self.assertEqual(result.stdout, "")

    def test_edge_02_two_empty_lines(self):
        """Two empty lines."""
        result = run_solution('print-in-reverse-order-2', '\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n###\n\n')


if __name__ == "__main__":
    unittest.main()
